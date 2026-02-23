
package com.teleauora.portal.catalog;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "service_plans")
public class ServicePlan {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable=false, unique=true) private String code;
  @Column(nullable=false) private String tier;
  @Column(nullable=false) private String name;
  @Column(nullable=false, columnDefinition="text") private String description;
  private Integer downloadMbps;
  private Integer uploadMbps;
  private String marketingSpeedLbl;
  @Column(nullable=false) private Boolean unlimitedData = true;
  @Column(nullable=false) private BigDecimal priceAmount;
  @Column(nullable=false, length=3) private String priceCurrency = "GBP";
  private String promoBadge;
  private String imageUrl;
  @Column(nullable=false) private Integer sortOrder = 0;
  @Column(nullable=false) private Boolean active = true;
  @Column(nullable=false) private Instant createdAt = Instant.now();
  @Column(nullable=false) private Instant updatedAt = Instant.now();

  // getters and setters
  public Long getId() { return id; }
  public String getCode() { return code; }
  public void setCode(String code) { this.code = code; }
  public String getTier() { return tier; }
  public void setTier(String tier) { this.tier = tier; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public Integer getDownloadMbps() { return downloadMbps; }
  public void setDownloadMbps(Integer downloadMbps) { this.downloadMbps = downloadMbps; }
  public Integer getUploadMbps() { return uploadMbps; }
  public void setUploadMbps(Integer uploadMbps) { this.uploadMbps = uploadMbps; }
  public String getMarketingSpeedLbl() { return marketingSpeedLbl; }
  public void setMarketingSpeedLbl(String marketingSpeedLbl) { this.marketingSpeedLbl = marketingSpeedLbl; }
  public Boolean getUnlimitedData() { return unlimitedData; }
  public void setUnlimitedData(Boolean unlimitedData) { this.unlimitedData = unlimitedData; }
  public BigDecimal getPriceAmount() { return priceAmount; }
  public void setPriceAmount(BigDecimal priceAmount) { this.priceAmount = priceAmount; }
  public String getPriceCurrency() { return priceCurrency; }
  public void setPriceCurrency(String priceCurrency) { this.priceCurrency = priceCurrency; }
  public String getPromoBadge() { return promoBadge; }
  public void setPromoBadge(String promoBadge) { this.promoBadge = promoBadge; }
  public String getImageUrl() { return imageUrl; }
  public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
  public Integer getSortOrder() { return sortOrder; }
  public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
  public Boolean getActive() { return active; }
  public void setActive(Boolean active) { this.active = active; }
  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
  public Instant getUpdatedAt() { return updatedAt; }
  public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
