package com.example.business.security.controller;

import com.example.business.security.dto.LoginRequest;
import com.example.business.security.dto.RegisterRequest;
import com.example.business.security.entity.AppUser;
import com.example.business.security.repository.UserRepository;
import com.example.business.security.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String token = jwtUtil.generateToken(
                request.getUsername());

        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "username", request.getUsername()
                )
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        // username already exists
        if (userRepository.findByUsername(
                request.getUsername()).isPresent()) {

            return ResponseEntity.badRequest()
                    .body("Username already exists");
        }

        AppUser user = new AppUser();

        user.setUsername(request.getUsername());

        // encrypted password
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole("USER");

        userRepository.save(user);

        return ResponseEntity.ok("User Registered Successfully");
    }
}
