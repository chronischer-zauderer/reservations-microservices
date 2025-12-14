package com.reservations.booking_service.service;

import com.reservations.booking_service.model.Booking;
import com.reservations.booking_service.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository repo;

    public BookingService(BookingRepository repo) { this.repo = repo; }

    public List<Booking> findAll() { return repo.findAll(); }

    public Optional<Booking> findById(Long id) { return repo.findById(id); }

    public Booking save(Booking b) { return repo.save(b); }

    public void deleteById(Long id) { repo.deleteById(id); }

    public boolean existsById(Long id) { return repo.existsById(id); }
}
