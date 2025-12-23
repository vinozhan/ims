package com.company.inventory.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;
//port jakarta.annotation.PostConstruct;

import java.security.Key;

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "very_secret_key_change_later_very_secret_key_change_later";

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String generateToken(String username, String role) {

        long expirationMs = 1000 * 60 * 60; // 1 hour

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // @Autowired
    // PasswordEncoder passwordEncoder;

    // @PostConstruct
    // public void printHash() {
    //     System.out.println(passwordEncoder.encode("admin123"));
    // }

    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    public boolean isTokenValid(String token) {
        try {
            return !getClaims(token).getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
