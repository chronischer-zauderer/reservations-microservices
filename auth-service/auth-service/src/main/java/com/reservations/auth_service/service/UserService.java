package com.reservations.auth_service.service;

import com.reservations.auth_service.model.User;
import com.reservations.auth_service.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User save(User u) { return repo.save(u); }

    public List<User> findAll() { return repo.findAll(); }
    
    public java.util.Optional<User> findById(Long id) { return repo.findById(id); }

    public boolean existsById(Long id) { return repo.existsById(id); }

    public void deleteById(Long id) { repo.deleteById(id); }
}
