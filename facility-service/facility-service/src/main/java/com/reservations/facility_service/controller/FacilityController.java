package com.reservations.facility_service.controller;

import com.reservations.facility_service.model.Facility;
import com.reservations.facility_service.dto.FacilityRequest;
import com.reservations.facility_service.dto.FacilityResponse;
import com.reservations.facility_service.repository.FacilityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facilities")
public class FacilityController {

    private final com.reservations.facility_service.service.FacilityService service;

    public FacilityController(com.reservations.facility_service.service.FacilityService service) {
        this.service = service;
    }

    @GetMapping
    public List<FacilityResponse> all() {
        return service.findAll().stream().map(this::toResponse).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacilityResponse> get(@PathVariable Long id) {
        return service.findById(id).map(f -> ResponseEntity.ok(toResponse(f))).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public FacilityResponse create(@RequestBody FacilityRequest req) {
        Facility f = new Facility(req.getName(), req.getDescription(), req.getCapacity());
        Facility saved = service.save(f);
        return toResponse(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacilityResponse> update(@PathVariable Long id, @RequestBody FacilityRequest req) {
        return service.findById(id).map(existing -> {
            existing.setName(req.getName());
            existing.setDescription(req.getDescription());
            existing.setCapacity(req.getCapacity());
            Facility saved = service.save(existing);
            return ResponseEntity.ok(toResponse(saved));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.existsById(id)) return ResponseEntity.notFound().build();
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private FacilityResponse toResponse(Facility f) {
        FacilityResponse r = new FacilityResponse();
        r.setId(f.getId());
        r.setName(f.getName());
        r.setDescription(f.getDescription());
        r.setCapacity(f.getCapacity());
        return r;
    }
}
