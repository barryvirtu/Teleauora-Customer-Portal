
package com.teleauora.portal.tickets;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ServicePlanRepository extends JpaRepository<TicketsService, Long> {
  Optional<TicketsService> findByCode(String code);
  List<TicketsService> findAllByActiveTrueOrderBySortOrderAscNameAsc();
}
