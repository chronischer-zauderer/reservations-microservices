package com.reservations.facility_service.service;

import com.reservations.facility_service.model.Equipment;
import com.reservations.facility_service.repository.EquipmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipmentService {

    private final EquipmentRepository repo;

    public EquipmentService(EquipmentRepository repo) {
        this.repo = repo;
    }

    public List<Equipment> findAll() { return repo.findAll(); }

    public List<Equipment> findByFacilityId(Long facilityId) { return repo.findByFacility_Id(facilityId); }

    public Optional<Equipment> findById(Long id) { return repo.findById(id); }

    public Equipment save(Equipment e) { return repo.save(e); }

    public void deleteById(Long id) { repo.deleteById(id); }

    public boolean existsById(Long id) { return repo.existsById(id); }
}
