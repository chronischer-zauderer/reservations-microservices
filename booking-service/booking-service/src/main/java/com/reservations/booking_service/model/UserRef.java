package com.reservations.booking_service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserRef {

    @Id
    private Long id;

    public UserRef() {}

    public UserRef(Long id) { this.id = id; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
}
