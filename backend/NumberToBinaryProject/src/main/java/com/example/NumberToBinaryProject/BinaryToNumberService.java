package com.example.NumberToBinaryProject;

import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.*;
@Service
public class BinaryToNumberService {
    public String binaryToNumberConverter(String binary){
        try {
            BigInteger num = new BigInteger(binary, 2); // base 2
            return num.toString(); // decimal
        } catch (Exception e) {
            return "Invalid binary";
        }
    }
}
