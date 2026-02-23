package com.teleauora.portal;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {

  @GetMapping("/plans")
  public List<Map<String,Object>> getPlans() {
    return List.of(
      Map.of("code","STARTER_CONNECT","name","Starter Connect","priceAmount",29.99,"marketingSpeedLbl","150 Mbps"),
      Map.of("code","EVERYDAY_STREAMING","name","Everyday Streaming","priceAmount",34.99,"marketingSpeedLbl","300 Mbps"),
      Map.of("code","FAMILY_MAX","name","Family Max","priceAmount",39.99,"marketingSpeedLbl","500 Mbps"),
      Map.of("code","HOME_GIG","name","Home Gig","priceAmount",44.99,"marketingSpeedLbl","1 Gbps"),
      Map.of("code","INFINITY_HOME","name","Infinity Home","priceAmount",59.99,"marketingSpeedLbl","Unlimited Speed")
    );
  }
}
