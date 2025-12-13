package com.reservations.facility_service.repository;

import com.reservations.facility_service.model.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityRepository extends JpaRepository<Facility, Long> {
}
