import java.sql.Connection;
import java.sql.DriverManager;

public class TestConnection {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/caltrack";
        String user = "caltrack";
        String password = "caltrack";
        
        try {
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("✓ Connection successful!");
            conn.close();
        } catch (Exception e) {
            System.out.println("✗ Connection failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
