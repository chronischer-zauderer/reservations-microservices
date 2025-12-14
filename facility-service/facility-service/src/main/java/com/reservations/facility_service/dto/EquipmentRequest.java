package com.reservations.facility_service.dto;

public class EquipmentRequest {
    private String name;
    private String description;
    private Long facilityId;

    public EquipmentRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Long getFacilityId() { return facilityId; }
    public void setFacilityId(Long facilityId) { this.facilityId = facilityId; }
}
