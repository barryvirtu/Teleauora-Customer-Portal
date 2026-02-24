package com.teleauora.portal.tickets;

import com.teleauora.portal.tickets.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class TicketsHaloApiService {

    private final WebClient ticketsWebClient;
    private final TicketsProperties props;

    private Mono<String> getAccessToken() {
        return ticketsWebClient.post()
                .uri(props.getAuthTokenUrl())
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .bodyValue(
                        "grant_type=password" +
                        "&client_id=" + props.getClientId() +
                        "&username=" + props.getUsername() +
                        "&password=" + props.getPassword() +
                        "&scope=" + props.getScope()
                )
                .retrieve()
                .bodyToMono(TicketsTokenResponse.class)
                .map(TicketsTokenResponse::getAccessToken);
    }

    /** CREATE ticket */
    public Mono<TicketsCreateResponse> createTicket(TicketsCreateRequest req) {
        return getAccessToken().flatMap(token ->
                ticketsWebClient.post()
                        .uri(props.getApiBaseUrl() + "/Tickets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .headers(h -> h.setBearerAuth(token))
                        .bodyValue(req)
                        .retrieve()
                        .bodyToMono(TicketsCreateResponse.class)
        );
    }

    /** GET one ticket */
    public Mono<TicketsCreateResponse> getTicket(Integer id) {
        return getAccessToken().flatMap(token ->
                ticketsWebClient.get()
                        .uri(props.getApiBaseUrl() + "/Ticket/" + id)
                        .headers(h -> h.setBearerAuth(token))
                        .retrieve()
                        .bodyToMono(TicketsCreateResponse.class)
        );
    }

    /** GET all tickets */
    public Mono<TicketsListResponse> listTickets() {
        return getAccessToken().flatMap(token ->
                ticketsWebClient.get()
                        .uri(props.getApiBaseUrl() + "/Tickets")
                        .headers(h -> h.setBearerAuth(token))
                        .retrieve()
                        .bodyToMono(TicketsListResponse.class)
        );
    }

    /** UPDATE ticket */
    public Mono<TicketsCreateResponse> updateTicket(Integer id, TicketsCreateRequest req) {
        return getAccessToken().flatMap(token ->
                ticketsWebClient.post() // Halo uses POST for ticket updates
                        .uri(props.getApiBaseUrl() + "/Tickets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .headers(h -> h.setBearerAuth(token))
                        .bodyValue(new TicketsCreateRequest[]{ req }) // Halo updates in arrays
                        .retrieve()
                        .bodyToMono(TicketsCreateResponse.class)
        );
    }

    /** DELETE (or close) ticket */
    public Mono<Void> deleteTicket(Integer id) {
        return getAccessToken().flatMap(token ->
                ticketsWebClient.delete()
                        .uri(props.getApiBaseUrl() + "/Tickets/" + id)
                        .headers(h -> h.setBearerAuth(token))
                        .retrieve()
                        .bodyToMono(Void.class)
        );
    }
}