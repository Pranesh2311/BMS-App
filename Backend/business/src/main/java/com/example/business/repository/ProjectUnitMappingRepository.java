package com.example.business.repository;

import com.example.business.entity.ProjectUnitMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectUnitMappingRepository extends JpaRepository<ProjectUnitMapping, Long> {

    // Get all units for a project
    List<ProjectUnitMapping> findByProjectId(Long projectId);

    // Delete mappings when updating project
    void deleteByProjectId(Long projectId);
}