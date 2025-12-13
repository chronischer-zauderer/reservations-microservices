package com.reservations.facility_service.controller;

import com.reservations.facility_service.model.Equipment;
import com.reservations.facility_service.model.Facility;
import com.reservations.facility_service.repository.EquipmentRepository;
import com.reservations.facility_service.repository.FacilityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

    private final EquipmentRepository eqRepo;
    private final FacilityRepository facilityRepo;

    public EquipmentController(EquipmentRepository eqRepo, FacilityRepository facilityRepo) {
        this.eqRepo = eqRepo;
        this.facilityRepo = facilityRepo;
    }

    @GetMapping
    public List<Equipment> all() { return eqRepo.findAll(); }

    @GetMapping("/facility/{facilityId}")
    public List<Equipment> byFacility(@PathVariable Long facilityId) { return eqRepo.findByFacilityId(facilityId); }

    @PostMapping
    public ResponseEntity<Equipment> create(@RequestBody Equipment eq) {
        if (eq.getFacility() != null && eq.getFacility().getId() != null) {
            Facility f = facilityRepo.findById(eq.getFacility().getId()).orElse(null);
            eq.setFacility(f);
        }
        return ResponseEntity.ok(eqRepo.save(eq));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!eqRepo.existsById(id)) return ResponseEntity.notFound().build();
        eqRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
