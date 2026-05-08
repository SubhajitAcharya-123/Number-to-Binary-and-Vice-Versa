//package com.example.NumberToBinaryProject;
//
//import jakarta.servlet.*;
//import jakarta.servlet.http.*;
//import java.io.IOException;
//
//import org.springframework.core.annotation.Order;
//import org.springframework.stereotype.Component;
//
//@Component
//@Order(1)
//public class JwtFilter implements Filter {
//
//    private final JwtUtil jwtUtil;
//
//    public JwtFilter(JwtUtil jwtUtil) {
//        this.jwtUtil = jwtUtil;
//    }
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//            throws IOException, ServletException {
//
//        HttpServletRequest req = (HttpServletRequest) request;
//
//        if (req.getMethod().equalsIgnoreCase("OPTIONS")) {
//            chain.doFilter(request, response);
//            return;
//        }
//        String header = req.getHeader("Authorization");
//
//        if (header != null && header.startsWith("Bearer ")) {
//            String token = header.substring(7);
//
//            if (!jwtUtil.validateToken(token)) {
//                ((HttpServletResponse) response).sendError(401, "Invalid Token");
//                return;
//            }
//        }
//
//        chain.doFilter(request, response);
//    }
//}
