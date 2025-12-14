package com.reservations.booking_service.controller;

import com.reservations.booking_service.model.Booking;
import com.reservations.booking_service.service.BookingService;
import com.reservations.booking_service.dto.BookingRequest;
import com.reservations.booking_service.dto.BookingResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService service;

    public BookingController(BookingService service) { this.service = service; }

    @GetMapping
    public List<BookingResponse> all() {
        return service.findAll().stream().map(this::toResponse).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> get(@PathVariable Long id) {
        return service.findById(id).map(b -> ResponseEntity.ok(toResponse(b))).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public BookingResponse create(@RequestBody BookingRequest req) {
        Booking b = new Booking();
        b.setFacilityId(req.getFacilityId());
        b.setUserId(req.getUserId());
        b.setStartTime(req.getStartTime());
        b.setEndTime(req.getEndTime());
        Booking saved = service.save(b);
        return toResponse(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingResponse> update(@PathVariable Long id, @RequestBody BookingRequest req) {
        return service.findById(id).map(existing -> {
            existing.setFacilityId(req.getFacilityId());
            existing.setUserId(req.getUserId());
            existing.setStartTime(req.getStartTime());
            existing.setEndTime(req.getEndTime());
            Booking saved = service.save(existing);
            return ResponseEntity.ok(toResponse(saved));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.existsById(id)) return ResponseEntity.notFound().build();
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private BookingResponse toResponse(Booking b) {
        BookingResponse r = new BookingResponse();
        r.setId(b.getId());
        r.setFacilityId(b.getFacilityId());
        r.setUserId(b.getUserId());
        r.setStartTime(b.getStartTime());
        r.setEndTime(b.getEndTime());
        return r;
    }
}
