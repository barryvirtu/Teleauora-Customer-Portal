package com.teleauora.portal.tickets;

import com.teleauora.portal.tickets.dto.CreateTicketForCustomerRequest;
import com.teleauora.portal.tickets.dto.TicketsCreateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tickets")
public class TicketsCustomerController {

    private final TicketsOrchestrationService orchestration;

    /**
     * Creates a Halo ticket for a specific customerId from the local DB.
     * POST /api/tickets/customer/{customerId}
     */
    @PostMapping("/customer/{customerId}")
    public Mono<ResponseEntity<TicketsCreateResponse>> createForCustomer(
            @PathVariable Long customerId,
            @RequestBody CreateTicketForCustomerRequest request) {

        return orchestration.createForCustomer(customerId, request)
                .map(ResponseEntity::ok);
    }
}