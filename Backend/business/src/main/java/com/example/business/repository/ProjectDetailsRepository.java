package com.example.business.repository;

import com.example.business.entity.ProjectDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectDetailsRepository extends JpaRepository<ProjectDetails, Long> {
}