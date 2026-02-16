# 💻 USACO Code Runner

Run USACO-style Java code directly in your browser with a built-in editor, input, and output panels. Perfect for practicing competitive programming problems!

## ✨ Features

- 📝 **CodeMirror Editor**: Syntax highlighting, line numbers, and bracket matching for Java.
- 🚀 **Instant Execution**: Run your Java code and see the output immediately.
- 📥 **Input Panel**: Provide custom test case inputs.
- 📤 **Output Panel**: View `System.out.println` and `PrintWriter` output.
- 📊 **Performance Stats**: (Coming soon: Simulated time and memory usage for competitive programming context).
- 💾 **Save/Load Code**: Your code is saved locally in your browser (LocalStorage).
- 📄 **USACO Template**: Quick button to load a standard USACO Java template.
- 🌑 **Dark Theme**: A sleek, competitive programming-inspired dark UI.

## 🚀 Quick Start

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/usaco-runner.git
    cd usaco-runner
    ```
2.  **Open `index.html` in your web browser**:
    ```bash
    open index.html
    ```

## 🎮 How to Use

1.  **Write your Java code** in the editor. You can use the `Template` button to get started.
2.  **Paste your input** (if any) into the `Input` panel.
3.  Click the `⚡ Run Code` button.
4.  Your code's output will appear in the `Output` panel.
5.  Use `Save` to store your current code locally, and `Load` to retrieve it.
6.  `Clear` buttons are available for `Output` and `Input`.

## 🛠️ Technology Stack

-   **Frontend**: HTML5, CSS3 (Tailwind CSS via CDN), JavaScript
-   **Code Editor**: CodeMirror
-   **Java Execution**: Simulated via JavaScript (for browser-side execution)
-   **Local Storage**: For saving/loading code

## ⚠️ Important Note on Java Execution

This web page *simulates* Java code execution directly in the browser using JavaScript. It does **not** run a full JVM. While it's great for basic USACO-style problems (especially those using `BufferedReader` and `PrintWriter` for I/O), it may not support all advanced Java features or libraries that require a full JVM environment. For strict competitive programming environments, always test with a real Java compiler.

## 📚 USACO-style I/O

The template code includes typical competitive programming I/O setup:

```java
import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter pw = new PrintWriter(new BufferedOutputStream(System.out));
        
        // Your code here
        
        pw.close();
        br.close();
    }
}
```

## 🤝 Contributing

Feel free to fork the repository, submit issues, or propose improvements!

## 📄 License

MIT