package com.teleauora.portal.tickets.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketsCreateRequest {

    // ➜ Needed for UPDATE operations
    private Integer id;

    // ➜ The rest is unchanged from your existing class
    private Integer tickettype_id;
    private String summary;
    private String details;
    private Integer client_id;
    private Integer priority_id;
    private String dateoccurred;
    private String team;
    private Integer workflow_id;
    private Integer workflow_step;
}