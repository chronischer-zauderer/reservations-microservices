package com.reservations.booking_service.dto;

import java.time.LocalDateTime;

public class BookingRequest {
    private Long facilityId;
    private Long userId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public BookingRequest() {}

    public Long getFacilityId() { return facilityId; }
    public void setFacilityId(Long facilityId) { this.facilityId = facilityId; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
}
