package com.teleauora.portal.tickets;

import com.teleauora.portal.tickets.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tickets")
public class TicketsController {

    private final TicketsService ticketsService;

    @PostMapping("/create")
    public Mono<ResponseEntity<TicketsCreateResponse>> createTicket(
            @RequestBody TicketsCreateRequest request) {

        return ticketsService.createTicket(request)
                .map(ResponseEntity::ok);
    }
}