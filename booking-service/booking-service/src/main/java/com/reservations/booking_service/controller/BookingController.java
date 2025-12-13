package com.reservations.booking_service.controller;

import com.reservations.booking_service.model.Booking;
import com.reservations.booking_service.repository.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingRepository repo;

    public BookingController(BookingRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Booking> all() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> get(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Booking create(@RequestBody Booking b) { return repo.save(b); }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> update(@PathVariable Long id, @RequestBody Booking b) {
        return repo.findById(id).map(existing -> {
            existing.setFacilityId(b.getFacilityId());
            existing.setUserId(b.getUserId());
            existing.setStartTime(b.getStartTime());
            existing.setEndTime(b.getEndTime());
            return ResponseEntity.ok(repo.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
