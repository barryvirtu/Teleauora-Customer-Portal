package com.teleauora.portal.tickets.dto;

import lombok.Data;

@Data
public class TicketsCreateResponse {
    private Integer id;
    private String ref;
    private String summary;
}