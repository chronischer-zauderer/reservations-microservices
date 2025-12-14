package com.reservations.facility_service.dto;

public class FacilityRequest {
    private String name;
    private String description;
    private Integer capacity;

    public FacilityRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
}
