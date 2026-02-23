
package com.teleauora.portal.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.teleauora.portal.model.ServicePlan;
import java.util.List;

public interface ServicePlanRepository extends JpaRepository<ServicePlan, Long> {
  List<ServicePlan> findAllByActiveTrueOrderByNameAsc();
}
