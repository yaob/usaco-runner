# 🚀 Java Code Runner - Runtime Input Feature

## New Feature: Runtime Input Box

The Java Code Runner now includes a **Runtime Input** box that allows you to provide input to your Java programs at runtime (similar to `Scanner(System.in)`).

---

## How to Use

### 1. Enter Your Java Code

Write your Java code using `Scanner` to read input:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter your name:");
        String name = scanner.nextLine();

        System.out.println("\nHello, " + name + "!");
        System.out.println("Welcome to Java Code Runner!");
    }
}
```

### 2. Provide Runtime Input

In the new **Runtime Input** box, enter the input for your program:

```
John
```

### 3. Run the Code

Click **"Run Code"** or press **Ctrl+Enter**

The program will read the input from the Runtime Input box and use it as `System.in` input.

---

## Examples

### Example 1: Number Input

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter a number:");
        int num = scanner.nextInt();

        System.out.println("You entered: " + num);
        System.out.println("Double: " + (num * 2));
    }
}
```

**Runtime Input:** `25`

**Output:**
```
Enter a number:
You entered: 25
Double: 50
```

---

### Example 2: String Input

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("What is your favorite language?");
        String lang = scanner.nextLine();

        System.out.println("I love " + lang + " too!");
    }
}
```

**Runtime Input:** `Java`

**Output:**
```
What is your favorite language?
I love Java too!
```

---

### Example 3: Math Operations

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter two numbers separated by space:");
        int a = scanner.nextInt();
        int b = scanner.nextInt();

        int sum = a + b;
        int product = a * b;

        System.out.println("\nResults:");
        System.out.println("Sum: " + sum);
        System.out.println("Product: " + product);
    }
}
```

**Runtime Input:** `10 5`

**Output:**
```
Enter two numbers separated by space:

Results:
Sum: 15
Product: 50
```

---

## Tips

1. **Use `scanner.nextLine()`** for strings with spaces
2. **Use `scanner.nextInt()`** for integers
3. **Use `scanner.nextDouble()`** for floating-point numbers
4. **Press Ctrl+Enter** for quick execution
5. **Clear Output** button to reset the output area

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Run code |
| `Ctrl + Enter` in Runtime Input | Run with runtime input |

---

## Server Requirements

- Node.js 14+
- Java 8+
- Server running on port 8080

---

## Getting Started

1. Start the server: `node server.js`
2. Open: `http://localhost:8080`
3. Enter your Java code
4. Provide runtime input (optional)
5. Click "Run Code" or press Ctrl+Enter

---

Happy coding! 🚀