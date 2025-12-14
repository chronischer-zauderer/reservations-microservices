package com.reservations.facility_service.controller;

import com.reservations.facility_service.model.Equipment;
import com.reservations.facility_service.model.Facility;
import com.reservations.facility_service.dto.EquipmentRequest;
import com.reservations.facility_service.dto.EquipmentResponse;
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
    public List<EquipmentResponse> all() {
        return eqService.findAll().stream().map(this::toResponse).toList();
    }

    @GetMapping("/facility/{facilityId}")
    public List<EquipmentResponse> byFacility(@PathVariable Long facilityId) {
        return eqService.findByFacilityId(facilityId).stream().map(this::toResponse).toList();
    }

    @PostMapping
    public ResponseEntity<EquipmentResponse> create(@RequestBody EquipmentRequest req) {
        Facility f = null;
        if (req.getFacilityId() != null) {
            f = facilityService.findById(req.getFacilityId()).orElse(null);
        }
        Equipment eq = new Equipment(req.getName(), req.getDescription(), f);
        Equipment saved = eqService.save(eq);
        return ResponseEntity.ok(toResponse(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EquipmentResponse> update(@PathVariable Long id, @RequestBody EquipmentRequest req) {
        return eqService.findById(id).map(existing -> {
            existing.setName(req.getName());
            existing.setDescription(req.getDescription());
            if (req.getFacilityId() != null) {
                Facility f = facilityService.findById(req.getFacilityId()).orElse(null);
                existing.setFacility(f);
            }
            Equipment saved = eqService.save(existing);
            return ResponseEntity.ok(toResponse(saved));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!eqService.existsById(id)) return ResponseEntity.notFound().build();
        eqService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private EquipmentResponse toResponse(Equipment e) {
        EquipmentResponse r = new EquipmentResponse();
        r.setId(e.getId());
        r.setName(e.getName());
        r.setDescription(e.getDescription());
        r.setFacilityId(e.getFacility() != null ? e.getFacility().getId() : null);
        return r;
    }
}
