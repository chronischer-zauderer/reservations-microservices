package com.reservations.facility_service.service;

import com.reservations.facility_service.model.Facility;
import com.reservations.facility_service.repository.FacilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacilityService {

    private final FacilityRepository repo;

    public FacilityService(FacilityRepository repo) {
        this.repo = repo;
    }

    public List<Facility> findAll() { return repo.findAll(); }

    public Optional<Facility> findById(Long id) { return repo.findById(id); }

    public Facility save(Facility f) { return repo.save(f); }

    public void deleteById(Long id) { repo.deleteById(id); }

    public boolean existsById(Long id) { return repo.existsById(id); }
}
