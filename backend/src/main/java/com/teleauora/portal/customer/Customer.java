package com.teleauora.portal.customer;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "customer_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="first_name", nullable=false, length=100)
    private String firstName;

    @Column(name="last_name", nullable=false, length=100)
    private String lastName;

    @Column(nullable=false, unique=true, length=255)
    private String email;

    @Column(length=50)
    private String phone;

    @Column(columnDefinition = "text")
    private String address;

    @Column(name="account_number", unique=true, length=100)
    private String accountNumber;

    @Column(name="halo_client_id", nullable=false)
    private Integer haloClientId;

    @Column(name="halo_site_id")
    private Integer haloSiteId;

    @Column(name="created_at")
    private OffsetDateTime createdAt;

    @Column(name="updated_at")
    private OffsetDateTime updatedAt;
}
