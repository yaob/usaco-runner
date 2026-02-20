# 🚀 USACO Code Runner

Interactive USACO problem solver with sample code and input.

## Features

- 📚 **3 USACO Sample Problems** with complete Java solutions
- 📥 **Load Sample Input** buttons for each problem
- 💻 **Code Editor** for writing your own solutions
- 📝 **Runtime Input** for testing with different inputs
- ⚡ **Quick Run** with Ctrl+Enter

---

## USACO Problems Included

### Problem 1: Maximum Array Value
**Description:** Find the maximum value in an array

**Code:**
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();
        int[] array = new int[n];

        for (int i = 0; i < n; i++) {
            array[i] = scanner.nextInt();
        }

        int max = array[0];
        for (int i = 1; i < n; i++) {
            if (array[i] > max) {
                max = array[i];
            }
        }

        System.out.println(max);
    }
}
```

**Sample Input:**
```
5
10 4 12 7 15
```

**Sample Output:**
```
15
```

---

### Problem 2: Milk Pails
**Description:** Find the maximum amount of milk that can be carried

**Code:**
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int X = scanner.nextInt();
        int Y = scanner.nextInt();
        int M = scanner.nextInt();

        int max = 0;

        for (int i = 0; i <= M / X; i++) {
            int remaining = M - i * X;
            if (remaining < 0) break;

            for (int j = 0; j <= remaining / Y; j++) {
                int total = i * X + j * Y;
                if (total <= M && total > max) {
                    max = total;
                }
            }
        }

        System.out.println(max);
    }
}
```

**Sample Input:**
```
8 4 24
```

**Sample Output:**
```
24
```

---

### Problem 3: The Clocks
**Description:** Find the minimum sequence of moves to set all clocks to the correct position

**Code:** (See the UI for the complete solution)

**Sample Input:**
```
0 3 0 3 0 3 0 3 0
```

**Sample Output:**
```
0 1 2
```

---

## How to Use

### Option 1: Use Sample Problems

1. **Select a USACO problem** from the dropdown
2. **Click "Load Sample 1"** to load sample input
3. **Click "Run Code"** to execute
4. **View output** in the output section

### Option 2: Write Your Own Solution

1. **Select "Custom Code"** from the dropdown
2. **Write your Java solution**
3. **Enter input** in the Runtime Input box
4. **Click "Run Code"** or press **Ctrl+Enter**

### Option 3: Test with Different Inputs

1. **Select a problem**
2. **Click "Load Sample 2"** or "Load Sample 3"
3. **Modify input** in the Runtime Input box
4. **Run the code**

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Run code |

---

## Tips

1. **Sample Input/Output:** Each problem has multiple sample inputs and outputs
2. **Multiple Samples:** Try all three samples for each problem
3. **Custom Code:** Write and test your own solutions
4. **Runtime Input:** Test with different inputs without changing code

---

## File Structure

```
public/
├── index.html           # Main UI
├── usaco1.java          # Problem 1 solution
├── usaco2.java          # Problem 2 solution
├── usaco3.java          # Problem 3 solution
├── usaco1_input.txt     # Problem 1 sample inputs
├── usaco2_input.txt     # Problem 2 sample inputs
├── usaco3_input.txt     # Problem 3 sample inputs
└── example.java         # Example solution
```

---

## Getting Started

1. **Start server:** `node server.js`
2. **Open:** `http://localhost:8080`
3. **Select a problem** or write your own code
4. **Load sample input** and run

---

Happy coding! 🚀