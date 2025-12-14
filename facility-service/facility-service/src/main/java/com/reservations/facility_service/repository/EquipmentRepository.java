package com.reservations.facility_service.repository;

import com.reservations.facility_service.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    // derive by nested property facility.id
    List<Equipment> findByFacility_Id(Long facilityId);
}
