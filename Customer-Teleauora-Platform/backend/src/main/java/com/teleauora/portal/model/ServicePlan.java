
package com.teleauora.portal.model;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="service_plans")
public class ServicePlan {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable=false, unique=true)
  private String code;

  private String tier;
  private String name;
  private String description;
  private Integer downloadMbps;
  private String marketingSpeedLbl;
  private BigDecimal priceAmount;
  private boolean active = true;

  public String getCode(){return code;}
  public String getName(){return name;}
  public BigDecimal getPriceAmount(){return priceAmount;}
  public String getMarketingSpeedLbl(){return marketingSpeedLbl;}
}
