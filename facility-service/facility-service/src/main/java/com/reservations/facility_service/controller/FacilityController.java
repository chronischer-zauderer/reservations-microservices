package com.reservations.facility_service.controller;

import com.reservations.facility_service.model.Facility;
import com.reservations.facility_service.repository.FacilityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facilities")
public class FacilityController {

    private final FacilityRepository repo;

    public FacilityController(FacilityRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Facility> all() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Facility> get(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Facility create(@RequestBody Facility f) { return repo.save(f); }

    @PutMapping("/{id}")
    public ResponseEntity<Facility> update(@PathVariable Long id, @RequestBody Facility f) {
        return repo.findById(id).map(existing -> {
            existing.setName(f.getName());
            existing.setDescription(f.getDescription());
            existing.setCapacity(f.getCapacity());
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
