import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Read the 9 clock positions
        int[] clocks = new int[9];
        for (int i = 0; i < 9; i++) {
            clocks[i] = scanner.nextInt() / 3;
        }

        int[] moves = new int[9];
        Arrays.fill(moves, -1);

        // BFS to find minimum moves
        int[] dx = {0, 3, 6, 0, 1, 2, 0, 3, 6};
        int[] dy = {3, 0, 0, 1, 1, 1, 2, 2, 2};

        solve(clocks, moves);

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < 9; i++) {
            if (moves[i] > 0) {
                result.append(moves[i]);
                result.append(" ");
            }
        }

        System.out.println(result.toString().trim());
    }

    static void solve(int[] clocks, int[] moves) {
        int[] dx = {0, 3, 6, 0, 1, 2, 0, 3, 6};
        int[] dy = {3, 0, 0, 1, 1, 1, 2, 2, 2};

        if (isAll(clocks, 4)) {
            return;
        }

        for (int i = 0; i < 9; i++) {
            if (moves[i] < 0) {
                moves[i] = 0;

                for (int j = 0; j < 4; j++) {
                    int x = dx[i] + j * dy[i];
                    clocks[x] = (clocks[x] + 1) % 4;
                }

                solve(clocks, moves);

                if (isAll(clocks, 4)) {
                    moves[i]++;
                    return;
                }

                for (int j = 0; j < 4; j++) {
                    int x = dx[i] + j * dy[i];
                    clocks[x] = (clocks[x] + 3) % 4;
                }

                moves[i] = -1;
            }
        }
    }

    static boolean isAll(int[] clocks, int target) {
        for (int clock : clocks) {
            if (clock != target) {
                return false;
            }
        }
        return true;
    }
}