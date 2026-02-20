# 📝 Runtime Input - Multiple Lines Support

## Overview
The Runtime Input box now supports multiple lines of text, allowing users to input complex inputs for their Java programs.

---

## Changes Made

### HTML Element Changed
**Before:** Single-line input
```html
<input type="text" id="runtimeInput" class="runtime-input" placeholder="Enter input...">
```

**After:** Multi-line textarea
```html
<textarea id="runtimeInput" class="runtime-input" rows="6" placeholder="Enter input...">
5
10 4 12 7 15
</textarea>
```

### CSS Updated
**Before:**
```css
.runtime-input {
    width: 100%;
    height: 50px;
    padding: 12px 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
}
```

**After:**
```css
.runtime-input {
    width: 100%;
    padding: 15px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    resize: vertical;
    box-sizing: border-box;
    transition: all 0.3s ease;
    line-height: 1.5;
    background: #fafafa;
}
```

---

## Features

### ✅ Multi-line Input
- Supports multiple lines of text
- Adjustable height via resize handle
- Scrollable when content exceeds visible area

### ✅ Monospace Font
- Uses 'Consolas', 'Monaco', 'Courier New' for code-like appearance
- Better readability for structured inputs

### ✅ Focus States
- Purple border highlight on focus
- Light gray to white background transition
- Subtle shadow effect

### ✅ Responsive
- Full width with proper box-sizing
- Adapts to container size
- Maintains readability on all screen sizes

---

## Usage Examples

### Example 1: Array Input
```
5
10 4 12 7 15
```

### Example 2: Multiple Numbers
```
3
1 2 3
4 5 6 7
8 9 10
```

### Example 3: Strings with Spaces
```
Hello
World
Java Programming
```

### Example 4: Mixed Input
```
5
John Doe
30
New York
USA
```

---

## Sample Inputs for USACO Problems

### USACO 1: Maximum Array Value
```
5
10 4 12 7 15
```

### USACO 2: Milk Pails
```
8 4 24
```

### USACO 3: The Clocks
```
0 3 0 3 0 3 0 3 0
```

---

## How to Use

1. **Select a USACO problem** from the dropdown
2. **Click "Load Sample 1/2/3"** to load sample input
3. **Edit the input** in the Runtime Input textarea as needed
4. **Click "Run Code"** or press **Ctrl+Enter**
5. **View output** in the output section

---

## Tips

- Press **Ctrl+Enter** to run quickly
- Use **resize handle** (bottom-right corner) to adjust height
- All lines of input are sent to Java's Scanner
- Multiple numbers on one line are automatically parsed by Scanner.nextInt()

---

## Status

✅ Multi-line input enabled
✅ Server running on port 8080
✅ All USACO problems tested
✅ Ready to use

---

**Open `http://localhost:8080` and try the multi-line input feature!** 🚀