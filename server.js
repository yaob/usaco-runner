const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const app = express();
const execAsync = promisify(exec);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

// Save code to a file
app.post('/api/save-code', async (req, res) => {
    try {
        const code = req.body.code;
        const filePath = path.join(__dirname, 'user_code.java');

        await writeFile(filePath, code);
        console.log('Code saved to:', filePath);

        res.json({ success: true, message: 'Code saved successfully' });
    } catch (error) {
        console.error('Error saving code:', error);
        res.json({ success: false, error: error.message });
    }
});

// Run Java code
app.post('/api/run-java', async (req, res) => {
    const code = req.body.code;
    const runtimeInput = req.body.input || '';
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'Main.java');
    const classFile = path.join(tempDir, 'Main.class');
    const inputFile = path.join(tempDir, 'input.txt');

    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    try {
        // Write the code to a file
        await writeFile(filePath, code);

        // Get the class name from the code
        const className = code.match(/public\s+class\s+(\w+)/)?.[1] || 'Main';

        // Write input to file if provided
        if (runtimeInput) {
            await writeFile(inputFile, runtimeInput);
        }

        // Compile the code
        const compileResult = await execAsync(
            `javac "${filePath}"`,
            { maxBuffer: 1024 * 1024 * 5 }
        );

        // Run the compiled class with input from file
        let runCommand;
        if (runtimeInput) {
            runCommand = `java -cp "${tempDir}" ${className} < "${inputFile}"`;
        } else {
            runCommand = `java -cp "${tempDir}" ${className}`;
        }

        const runResult = await execAsync(
            runCommand,
            { maxBuffer: 1024 * 1024 * 5 }
        );

        const stdout = runResult.stdout;
        const stderr = runResult.stderr;

        // Clean up compiled class file and input file
        if (fs.existsSync(classFile)) {
            fs.unlinkSync(classFile);
        }
        if (fs.existsSync(inputFile)) {
            fs.unlinkSync(inputFile);
        }

        res.json({
            success: true,
            stdout: stdout,
            stderr: stderr
        });

    } catch (error) {
        // Clean up on error
        if (fs.existsSync(classFile)) {
            try {
                fs.unlinkSync(classFile);
            } catch (e) {
                // Ignore cleanup errors
            }
        }
        if (fs.existsSync(inputFile)) {
            try {
                fs.unlinkSync(inputFile);
            } catch (e) {
                // Ignore cleanup errors
            }
        }

        console.error('Error running Java code:', error);

        res.json({
            success: false,
            stdout: error.stdout || '',
            stderr: error.stderr || error.message,
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Java Code Runner is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 Java Code Runner Server');
    console.log('='.repeat(50));
    console.log(`📍 Server running at: http://localhost:${PORT}`);
    console.log(`📁 Static files served from: public/`);
    console.log('💡 Press Ctrl+C to stop the server');
    console.log('='.repeat(50));
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down server...');
    process.exit(0);
});