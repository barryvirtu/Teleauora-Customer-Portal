package com.teleauora.portal.tickets.dto;

import lombok.Data;
import java.util.List;

@Data
public class TicketsListResponse {
    private List<TicketsCreateResponse> results;
}