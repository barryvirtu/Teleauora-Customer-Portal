package com.teleauora.portal.tickets;

import com.teleauora.portal.tickets.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/data/tickets")
public class TicketsCrudController {

    private final TicketsOrchestrationService svc;

    @GetMapping
    public Mono<ResponseEntity<TicketsListResponse>> list() {
        return svc.list().map(ResponseEntity::ok);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<TicketsCreateResponse>> get(@PathVariable Integer id) {
        return svc.get(id).map(ResponseEntity::ok);
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<TicketsCreateResponse>> update(
            @PathVariable Integer id,
            @RequestBody TicketsCreateRequest req) {
        return svc.update(id, req).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Integer id) {
        return svc.delete(id).map(ResponseEntity::ok);
    }
}