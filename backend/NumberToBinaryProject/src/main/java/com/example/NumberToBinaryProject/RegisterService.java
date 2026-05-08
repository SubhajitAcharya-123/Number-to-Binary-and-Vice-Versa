package com.example.NumberToBinaryProject;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.*;

@Service
public class RegisterService {
    private static final String url = "jdbc:mysql://localhost:3306/numberToBinaryProject";
    private static final String userName = "root";
    private static final String password = "Code2028";
    private final BCryptPasswordEncoder passwordEncoder;

    public RegisterService(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    public void sendDataBase(String MobileNo, String Name, String Password){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(url,userName,password);
            String hashedPassword = passwordEncoder.encode(Password);
            PreparedStatement psmt = con.prepareStatement("INSERT INTO user (MobileNo, UserName, Password) VALUES(?,?,?)");
            psmt.setString(1, MobileNo);
            psmt.setString(2,Name);
            psmt.setString(3,hashedPassword);
            psmt.executeUpdate();
            con.close();
        }catch(Exception e){
            System.out.println(e);
        }
    }
}

