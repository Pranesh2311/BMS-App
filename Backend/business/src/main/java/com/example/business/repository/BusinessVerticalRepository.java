package com.example.business.repository;

import com.example.business.entity.BusinessVertical;
import org.springframework.data.jpa.repository.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BusinessVerticalRepository extends JpaRepository<BusinessVertical, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE BusinessVertical b SET b.status = 'N'")
    void deactivateAll();

    List<BusinessVertical> findByStatus(String status);
}