package com.teleauora.portal.tickets.dto;

import lombok.Data;

@Data
public class CreateTicketForCustomerRequest {
    private String summary;
    private String details;

    // Optional fields with sensible defaults
    private Integer priority_id;     // e.g., 3 (Medium) or 4 (Low)
    private Integer tickettype_id;   // e.g., 1 (Incident) in many tenants
    private String team;             // optional
    private Integer workflow_id;     // optional
    private Integer workflow_step;   // optional
}
