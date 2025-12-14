package com.reservations.booking_service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "facility")
public class FacilityRef {

    @Id
    private Long id;

    public FacilityRef() {}

    public FacilityRef(Long id) { this.id = id; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
}
