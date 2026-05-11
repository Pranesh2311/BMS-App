package com.example.business.repository;

import com.example.business.entity.BusinessUnit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessUnitRepository extends JpaRepository<BusinessUnit, Long> {

    // Only active units (optional but recommended)
    List<BusinessUnit> findByStatus(String status);
}