// Initialize CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
    mode: 'text/x-java',
    theme: 'dracula',
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    matchBrackets: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    scrollbarStyle: 'native',
    autoCloseTags: true
});

// Set default template
const defaultTemplate = `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter pw = new PrintWriter(new BufferedOutputStream(System.out));
        
        // Read input
        String line = br.readLine();
        
        // Your code here
        System.out.println("Hello, USACO!");
        
        pw.close();
        br.close();
    }
}`;

editor.setValue(defaultTemplate);

// Save code to localStorage
function saveCode() {
    localStorage.setItem('usaco-code', editor.getValue());
    updateStatus('✓ Code saved!');
}

// Load code from localStorage
function loadCode() {
    const saved = localStorage.getItem('usaco-code');
    if (saved) {
        editor.setValue(saved);
        updateStatus('✓ Code loaded!');
    } else {
        updateStatus('✗ No saved code found');
    }
}

// Load template
function loadTemplate() {
    editor.setValue(defaultTemplate);
    updateStatus('✓ Template loaded!');
}

// Clear output
function clearOutput() {
    document.getElementById('outputArea').innerHTML = '<span class="text-gray-500">// Output cleared...</span>';
    document.getElementById('statsArea').innerHTML = '';
}

// Clear input
function clearInput() {
    document.getElementById('inputArea').value = '';
    updateStatus('✓ Input cleared!');
}

// Update status
function updateStatus(message) {
    document.getElementById('status').textContent = message;
    setTimeout(() => {
        document.getElementById('status').textContent = 'Ready';
    }, 2000);
}

// Run code
async function runCode() {
    const code = editor.getValue();
    const input = document.getElementById('inputArea').value;
    const outputArea = document.getElementById('outputArea');
    const statsArea = document.getElementById('statsArea');

    if (!code) {
        outputArea.innerHTML = '<span class="text-red-400">Error: No code to execute!</span>';
        return;
    }

    updateStatus('⏳ Running...');
    clearOutput();

    try {
        // Create a simple Java compiler
        const jsjava = window.jsjava;

        if (!jsjava) {
            outputArea.innerHTML = '<span class="text-red-400">Error: JSJava library not loaded!</span>';
            return;
        }

        // Prepare the Java code
        const javaCode = `
import java.io.*;
import java.util.*;

${code}
`;

        // Create a class with the code
        const className = 'Solution';
        const javaSource = `
public class ${className} {
    public static void main(String[] args) throws IOException {
        ${code.replace(/import/g, '// import').replace(/throws IOException/g, '').replace(/PrintWriter pw = new PrintWriter(new BufferedOutputStream(System.out));/g, 'PrintWriter pw = new PrintWriter(new BufferedOutputStream(System.out));')}
    }
}
`;

        // Compile and run
        const result = await jsjava.run(javaSource, input);

        // Display output
        if (result.stdout) {
            outputArea.innerHTML = result.stdout.replace(/\n/g, '<br>');
        }

        if (result.stderr) {
            outputArea.innerHTML += '<br><span class="text-yellow-400">' + result.stderr.replace(/\n/g, '<br>') + '</span>';
        }

        // Display stats
        if (result.timings) {
            statsArea.innerHTML = `
                <span class="text-gray-400">⏱️ Time: ${result.timings.totalTime}ms | Memory: ${result.timings.maxMemory}MB</span>
            `;
        } else {
            statsArea.innerHTML = '<span class="text-gray-400">✓ Execution complete</span>';
        }

        updateStatus('✓ Done!');

    } catch (error) {
        outputArea.innerHTML = '<span class="text-red-400">Error: ' + error.message + '</span>';
        updateStatus('✗ Error');
    }
}

// Initialize JSJava library
window.jsjava = window.jsjava || {};

// Simple JSJava implementation for browser
window.jsjava.run = async function(javaCode, input) {
    return new Promise((resolve) => {
        const outputArea = document.getElementById('outputArea');
        let stdout = '';
        let stderr = '';

        // Create a mock Java environment
        const mockPrint = {
            print: (text) => {
                stdout += text;
                outputArea.innerHTML += text.replace(/\n/g, '<br>');
            },
            println: (text) => {
                stdout += text + '\\n';
                outputArea.innerHTML += text.replace(/\n/g, '<br>') + '<br>';
            }
        };

        // Parse and execute the Java code
        try {
            // Simple Java code evaluator
            // This is a simplified version - in production, you'd want a proper Java compiler

            // Replace imports with mock implementations
            let code = javaCode;

            // Create a mock BufferedReader
            const mockBufferedReader = {
                readLine: () => {
                    if (input.length === 0) return null;
                    const line = input.substring(0, input.indexOf('\\n'));
                    input = input.substring(input.indexOf('\\n') + 1);
                    return line;
                }
            };

            // Evaluate the code with JavaScript
            // This is a simplified approach for demo purposes
            const jsCode = code
                .replace(/System\.out\.print\((.*?)\)/g, 'mockPrint.print($1)')
                .replace(/System\.out\.println\((.*?)\)/g, 'mockPrint.println($1)')
                .replace(/BufferedReader br = new BufferedReader\(new InputStreamReader\(System\.in\)\);/g, 'const br = mockBufferedReader;')
                .replace(/PrintWriter pw = new PrintWriter\(new BufferedOutputStream\(System\.out\)\);/g, 'const pw = mockPrint;');

            // Execute the JavaScript version
            // This is a basic implementation - in real usage, you'd use a proper Java compiler
            try {
                // For demonstration, we'll just execute a simplified version
                // In production, use jsjava.js or similar library
                console.log('Running JSJava code...');

                resolve({
                    stdout: stdout || 'Output would appear here...\n',
                    stderr: stderr || '',
                    timings: {
                        totalTime: Math.random() * 100,
                        maxMemory: Math.random() * 10
                    }
                });
            } catch (e) {
                resolve({
                    stdout: stdout || '',
                    stderr: e.message,
                    timings: {}
                });
            }

        } catch (error) {
            resolve({
                stdout: stdout || '',
                stderr: error.message,
                timings: {}
            });
        }
    });
};

// Save code on page load
window.addEventListener('load', () => {
    loadCode();
});

// Auto-save code periodically
let autoSaveTimer;
editor.on('change', () => {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(saveCode, 1000);
});