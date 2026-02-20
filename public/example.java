import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== Java Code Runner Demo ===");
        System.out.println("This program demonstrates runtime input");
        System.out.println("\nEnter a number to see its properties:");

        // Read input from Runtime Input box
        int num = scanner.nextInt();

        System.out.println("\n=== Results ===");
        System.out.println("Number: " + num);
        System.out.println("Square: " + (num * num));
        System.out.println("Cube: " + (num * num * num));
        System.out.println("Square Root: " + Math.sqrt(num));
        System.out.println("Double: " + (num * 2));
        System.out.println("Half: " + (num / 2));

        scanner.close();
    }
}