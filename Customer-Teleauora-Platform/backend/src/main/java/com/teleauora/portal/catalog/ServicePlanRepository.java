
package com.teleauora.portal.catalog;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ServicePlanRepository extends JpaRepository<ServicePlan, Long> {
  Optional<ServicePlan> findByCode(String code);
  List<ServicePlan> findAllByActiveTrueOrderBySortOrderAscNameAsc();
}
