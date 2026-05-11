package com.example.business.repository;

import com.example.business.entity.ProjectPhase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectPhaseRepository
        extends JpaRepository<ProjectPhase, Long> {
}