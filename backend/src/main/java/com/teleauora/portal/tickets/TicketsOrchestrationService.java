package com.teleauora.portal.tickets;

import com.teleauora.portal.customer.Customer;
import com.teleauora.portal.customer.CustomerRepository;
import com.teleauora.portal.tickets.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class TicketsOrchestrationService {

    private final TicketsHaloApiService halo;
    private final CustomerRepository customers;

    /** Create a ticket in Halo for a specific customer in DB */
    public Mono<TicketsCreateResponse> createForCustomer(Long customerId, CreateTicketForCustomerRequest input) {
        Customer c = customers.findById(customerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));

        String enrichedDetails =
                input.getDetails() + "\n\n---\nCustomer:\n" +
                "- Name: " + c.getFirstName() + " " + c.getLastName() + "\n" +
                "- Email: " + c.getEmail() + "\n" +
                "- Phone: " + c.getPhone() + "\n" +
                "- Account #: " + c.getAccountNumber();

        TicketsCreateRequest req = TicketsCreateRequest.builder()
                .tickettype_id(input.getTickettype_id() != null ? input.getTickettype_id() : 1)
                .summary(input.getSummary())
                .details(enrichedDetails)
                .priority_id(input.getPriority_id() != null ? input.getPriority_id() : 3)
                .client_id(c.getHaloClientId())
                .team(input.getTeam())
                .workflow_id(input.getWorkflow_id())
                .workflow_step(input.getWorkflow_step())
                .build();

        return halo.createTicket(req);
    }

    /** CRUD passthroughs to Halo */
    public Mono<TicketsCreateResponse> get(Integer id) {
        return halo.getTicket(id);
    }

    public Mono<TicketsListResponse> list() {
        return halo.listTickets();
    }

    public Mono<TicketsCreateResponse> update(Integer id, TicketsCreateRequest req) {
        req.setId(id);
        return halo.updateTicket(id, req);
    }

    public Mono<Void> delete(Integer id) {
        return halo.deleteTicket(id);
    }
}