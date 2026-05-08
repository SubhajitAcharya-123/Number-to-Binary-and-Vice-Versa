package com.example.NumberToBinaryProject;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.sql.*;

@Service
public class LoginService {
    private static final String url = "jdbc:mysql://localhost:3306/numberToBinaryProject";
    private static final String userName = "root";
    private static final String password = "Code2028";
    private final BCryptPasswordEncoder passwordEncoder;

    public LoginService(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    public boolean fetchDatabase(String UserName, String UserPassword){
        try{
            Connection con = DriverManager.getConnection(url,userName,password);

            PreparedStatement psmt = con.prepareStatement(
                    "SELECT * FROM user WHERE UserName = ?"
            );

            psmt.setString(1, UserName);

            ResultSet rs = psmt.executeQuery();

            if(rs.next()){
                String storedPassword = rs.getString("Password");
                return passwordEncoder.matches(UserPassword, storedPassword);
            }

            con.close();
            return false;
        }catch(Exception e){
            System.out.println(e);
            return false;
        }
    }

}
