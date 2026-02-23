
package com.teleauora.portal.catalog;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {
  private final ServicePlanRepository repo;
  public CatalogController(ServicePlanRepository repo) { this.repo = repo; }

  public record ServicePlanDTO(String code,String tier,String name,String description,
                               Integer downloadMbps,Integer uploadMbps,String marketingSpeedLbl,
                               boolean unlimitedData, BigDecimal priceAmount, String priceCurrency,
                               String promoBadge, String imageUrl) {}

  @GetMapping("/plans")
  public List<ServicePlanDTO> listActive() {
    return repo.findAllByActiveTrueOrderBySortOrderAscNameAsc().stream().map(this::toDto).toList();
  }

  @GetMapping("/plans/{code}")
  public ServicePlanDTO getByCode(@PathVariable String code) {
    return repo.findByCode(code).filter(ServicePlan::getActive).map(this::toDto)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
  }

  private ServicePlanDTO toDto(ServicePlan p) {
    return new ServicePlanDTO(
      p.getCode(), p.getTier(), p.getName(), p.getDescription(),
      p.getDownloadMbps(), p.getUploadMbps(), p.getMarketingSpeedLbl(),
      Boolean.TRUE.equals(p.getUnlimitedData()),
      p.getPriceAmount(), p.getPriceCurrency(),
      p.getPromoBadge(), p.getImageUrl()
    );
  }
}
