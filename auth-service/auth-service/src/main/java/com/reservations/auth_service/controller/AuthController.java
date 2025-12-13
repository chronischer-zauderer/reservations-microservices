package com.reservations.auth_service.controller;

import com.reservations.auth_service.model.User;
import com.reservations.auth_service.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User u) {
        // Nota: contraseña sin cifrar por simplicidad; en producción usar BCrypt
        User saved = userRepository.save(u);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/users")
    public List<User> users() {
        return userRepository.findAll();
    }
}
