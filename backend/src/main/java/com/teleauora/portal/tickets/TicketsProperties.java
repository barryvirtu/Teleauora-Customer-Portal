package com.teleauora.portal.tickets;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "tickets")
public class TicketsProperties {
    private String tenant;
    private String clientId;
    private String clientSecret;
    private String username;
    private String password;
    private String scope = "all";
    private String baseUrl;
    private int connectTimeoutMs = 5000;
    private int readTimeoutMs = 15000;

    public String getAuthTokenUrl() {
        return baseUrl + "/auth/token";
    }

    public String getApiBaseUrl() {
        return baseUrl + "/api";
    }
}