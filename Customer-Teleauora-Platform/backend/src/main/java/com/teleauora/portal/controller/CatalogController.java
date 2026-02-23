
package com.teleauora.portal.controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.teleauora.portal.repository.ServicePlanRepository;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {

  private final ServicePlanRepository repo;
  public CatalogController(ServicePlanRepository repo){this.repo=repo;}

  @GetMapping("/plans")
  public List<?> plans(){
    return repo.findAllByActiveTrueOrderByNameAsc();
  }
}
