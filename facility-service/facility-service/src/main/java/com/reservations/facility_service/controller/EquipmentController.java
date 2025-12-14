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

    private final com.reservations.facility_service.service.EquipmentService eqService;
    private final com.reservations.facility_service.service.FacilityService facilityService;

    public EquipmentController(com.reservations.facility_service.service.EquipmentService eqService,
                               com.reservations.facility_service.service.FacilityService facilityService) {
        this.eqService = eqService;
        this.facilityService = facilityService;
    }

    @GetMapping
    public List<Equipment> all() { return eqService.findAll(); }

    @GetMapping("/facility/{facilityId}")
    public List<Equipment> byFacility(@PathVariable Long facilityId) { return eqService.findByFacilityId(facilityId); }

    @PostMapping
    public ResponseEntity<Equipment> create(@RequestBody Equipment eq) {
        if (eq.getFacility() != null && eq.getFacility().getId() != null) {
            Facility f = facilityService.findById(eq.getFacility().getId()).orElse(null);
            eq.setFacility(f);
        }
        return ResponseEntity.ok(eqService.save(eq));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!eqService.existsById(id)) return ResponseEntity.notFound().build();
        eqService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
