package com.example.online_election.controller;

import com.example.online_election.dto.LoginRequest;
import com.example.online_election.dto.RegisterRequest;
import com.example.online_election.entity.User;
import com.example.online_election.repository.UserRepository;
import com.example.online_election.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        if (request.getEmail() == null || !request.getEmail().contains("@")) {
            return ResponseEntity.badRequest().body("Invalid email address");
        }

        if (request.getPhone() == null || !request.getPhone().matches("\\d{10}")) {
            return ResponseEntity.badRequest().body("Invalid phone number");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : "USER");
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        userRepository.save(user);
        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7); // 去掉 "Bearer "
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username).orElseThrow();
        return ResponseEntity.ok(user);
    }
}
