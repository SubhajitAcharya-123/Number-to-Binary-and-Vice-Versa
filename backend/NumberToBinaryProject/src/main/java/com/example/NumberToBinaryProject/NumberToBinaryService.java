package com.example.NumberToBinaryProject;

import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.*;
@Service
public class NumberToBinaryService {
    public String numberToBinaryConverter(String number){
        BigInteger num = new BigInteger(number);
        return num.toString(2);
    }
}
