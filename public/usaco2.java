import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int X = scanner.nextInt();
        int Y = scanner.nextInt();
        int M = scanner.nextInt();

        int max = 0;

        // Try all possible numbers of pails of size X
        for (int i = 0; i <= M / X; i++) {
            int remaining = M - i * X;
            if (remaining < 0) break;

            // Try all possible numbers of pails of size Y
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