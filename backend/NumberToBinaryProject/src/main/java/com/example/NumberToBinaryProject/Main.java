package com.example.NumberToBinaryProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@SpringBootApplication
//@CrossOrigin(origins = "http://localhost:3000")
@RestController//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    private final RegisterService registerService;
    private final LoginService loginService;
    private final NumberToBinaryService numberToBinaryService;
    private final BinaryToNumberService binaryToNumberService;
    private final JwtUtil jwtUtil;

    public Main(RegisterService registerService,
                LoginService loginService,
                NumberToBinaryService numberToBinaryService,
                BinaryToNumberService binaryToNumberService,
                JwtUtil jwtUtil) {
        this.registerService = registerService;
        this.loginService = loginService;
        this.numberToBinaryService = numberToBinaryService;
        this.binaryToNumberService = binaryToNumberService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/reg")
    public ResponseEntity<Map<String, String>> postData(@RequestBody Map<String, String> body) {
        Map<String, String> response = new HashMap<>();
        try {
            String mobileNo = body.get("sendMobileNo");
            String name = body.get("sendName");
            String password = body.get("sendPassword");

            registerService.sendDataBase(mobileNo, name, password);
            response.put("message", "Registration successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error occurred");
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/log")
    public ResponseEntity<Map<String, Object>> fetchData(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();

        try {
            String name = body.get("sendUserName");
            String password = body.get("sendPassword");

            if (loginService.fetchDatabase(name, password)) {

                String token = jwtUtil.generateToken(name);

                response.put("token", token);
                response.put("message", "Login successful");

            } else {
                response.put("message", "Incorrect Username or Password");
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "Error occurred");
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/nToB")
    public ResponseEntity<Map<String, Object>> numberToBinaryController(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();
        try {
            String num = body.get("sendNumber");
            String answer = numberToBinaryService.numberToBinaryConverter(num);
            response.put("message", answer);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error occurred");
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/bToN")
    public ResponseEntity<Map<String, Object>> binaryToNumberController(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();
        try {
            String binary = body.get("sendBinary");
            String answer = binaryToNumberService.binaryToNumberConverter(binary);
            response.put("message", answer);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Error occurred");
            return ResponseEntity.status(500).body(response);
        }
    }
}
