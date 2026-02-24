package com.teleauora.portal.tickets;

import com.teleauora.portal.tickets.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.*;
import reactor.core.publisher.Mono;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class TicketsService {

    private final WebClient ticketsWebClient;
    private final TicketsProperties props;

    private Mono<String> getAccessToken() {
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("client_id", props.getClientId());
        form.add("username", props.getUsername());
        form.add("password", props.getPassword());
        form.add("scope", props.getScope());

        return ticketsWebClient.post()
                .uri(props.getAuthTokenUrl())
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(form))
                .retrieve()
                .bodyToMono(TicketsTokenResponse.class)
                .map(TicketsTokenResponse::getAccessToken);
    }

    public Mono<TicketsCreateResponse> createTicket(TicketsCreateRequest req) {

        if (req.getDateoccurred() == null || req.getDateoccurred().isBlank()) {
            req.setDateoccurred(Instant.now().toString());
        }

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
}