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
    let inputData = document.getElementById('inputArea').value;
    const outputArea = document.getElementById('outputArea');
    const statsArea = document.getElementById('statsArea');

    if (!code) {
        outputArea.innerHTML = '<span class="text-red-400">Error: No code to execute!</span>';
        return;
    }

    updateStatus('⏳ Running...');
    clearOutput();

    let stdout = '';
    let stderr = '';
    const startTime = performance.now();

    // Mock System.out.print/println and BufferedReader.readLine
    const mockSystemOut = {
        print: (text) => { stdout += text; },
        println: (text) => { stdout += text + '\n'; }
    };

    let inputLines = inputData.split(/\r?\n/);
    let currentInputLine = 0;

    const mockBufferedReader = {
        readLine: () => {
            if (currentInputLine < inputLines.length) {
                return inputLines[currentInputLine++];
            }
            return null; // EOF
        }
    };

    const mockPrintWriter = {
        print: (text) => { stdout += text; },
        println: (text) => { stdout += text + '\n'; },
        close: () => { /* no-op for mock */ }
    };

    try {
        // This is a *highly simplified* simulation.
        // A full Java compiler/runtime in JS is complex.
        // This attempts to transform basic Java patterns into JS.

        // Replace Java I/O calls with our mocks
        let jsCode = code;
        jsCode = jsCode.replace(/System\.out\.println\((.*?)\);/g, 'mockSystemOut.println($1);');
        jsCode = jsCode.replace(/System\.out\.print\((.*?)\);/g, 'mockSystemOut.print($1);');
        jsCode = jsCode.replace(/BufferedReader\s+br\s*=\s*new\s+BufferedReader\(new\s+InputStreamReader\(System\.in\)\);/g, 'const br = mockBufferedReader;');
        jsCode = jsCode.replace(/PrintWriter\s+pw\s*=\s*new\s+PrintWriter\(new\s+BufferedOutputStream\(System\.out\)\);/g, 'const pw = mockPrintWriter;');
        jsCode = jsCode.replace(/br\.readLine\(\)/g, 'br.readLine()');
        jsCode = jsCode.replace(/pw\.println\((.*?)\)/g, 'mockPrintWriter.println($1);');
        jsCode = jsCode.replace(/pw\.print\((.*?)\)/g, 'mockPrintWriter.print($1);');
        jsCode = jsCode.replace(/pw\.close\(\);/g, 'mockPrintWriter.close();');

        // Basic variable declarations (e.g., int x = ...) will become let x = ...
        jsCode = jsCode.replace(/\b(int|double|String)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.*?);/g, 'let $2 = $3;');
        jsCode = jsCode.replace(/\b(int|double|String)\s+([a-zA-Z_][a-zA-Z0-9_]*);/g, 'let $2;');
        
        // Simplified Integer.parseInt
        jsCode = jsCode.replace(/Integer\.parseInt\((.*?)\)/g, 'parseInt($1)');

        // Wrap in a function to isolate scope and provide mocks
        const runnableCode = `
            (async function() {
                ${jsCode}
            })();
        `;
        
        // Execute the transformed code
        await eval(runnableCode);

    } catch (error) {
        stderr += `Runtime Error: ${error.message}\n`;
        console.error("Simulated Java Runtime Error:", error);
    }

    const endTime = performance.now();
    const totalTime = (endTime - startTime).toFixed(2);
    const maxMemory = (Math.random() * 50).toFixed(2); // Mock memory usage

    outputArea.innerHTML = 
        (stdout ? `<span class="text-green-400">${stdout.replace(/\n/g, '<br>')}</span>` : '') +
        (stderr ? `<span class="text-yellow-400">${stderr.replace(/\n/g, '<br>')}</span>` : '') +
        (!stdout && !stderr ? '<span class="text-gray-500">// No output generated or runtime error occurred.</span>' : '');

    statsArea.innerHTML = `
        <span class="text-gray-400">⏱️ Time: ${totalTime}ms | Memory: ${maxMemory}MB</span>
    `;
    updateStatus('✓ Done!');
}

// Auto-save code periodically
let autoSaveTimer;
editor.on('change', () => {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(saveCode, 1000);
});
