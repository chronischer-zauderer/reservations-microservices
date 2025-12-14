package com.reservations.auth_service.controller;

import com.reservations.auth_service.model.User;
import com.reservations.auth_service.service.UserService;
import com.reservations.auth_service.dto.UserRequest;
import com.reservations.auth_service.dto.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserRequest req) {
        // Nota: contraseña sin cifrar por simplicidad; en producción usar BCrypt
        User u = new User(req.getUsername(), req.getPassword());
        User saved = userService.save(u);
        return ResponseEntity.ok(toResponse(saved));
    }

    @GetMapping("/users")
    public List<UserResponse> users() {
        return userService.findAll().stream().map(this::toResponse).toList();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        return userService.findById(id).map(u -> ResponseEntity.ok(toResponse(u))).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest req) {
        return userService.findById(id).map(existing -> {
            existing.setUsername(req.getUsername());
            existing.setPassword(req.getPassword());
            User saved = userService.save(existing);
            return ResponseEntity.ok(toResponse(saved));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!userService.existsById(id)) return ResponseEntity.notFound().build();
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private UserResponse toResponse(User u) {
        UserResponse r = new UserResponse();
        r.setId(u.getId());
        r.setUsername(u.getUsername());
        return r;
    }
}
