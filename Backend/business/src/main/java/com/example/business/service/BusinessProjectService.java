package com.example.business.service;

import com.example.business.dto.BusinessProjectDTO;
import com.example.business.dto.UnitDistributionDTO;
import com.example.business.entity.BusinessProject;
import com.example.business.entity.BusinessUnit;
import com.example.business.entity.ProjectUnitMapping;
import com.example.business.repository.BusinessProjectRepository;
import com.example.business.repository.BusinessUnitRepository;
import com.example.business.repository.ProjectUnitMappingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class BusinessProjectService {

    private final BusinessProjectRepository projectRepo;
    private final BusinessUnitRepository unitRepo;
    private final ProjectUnitMappingRepository mappingRepo;

    public BusinessProjectService(BusinessProjectRepository projectRepo,
            BusinessUnitRepository unitRepo, ProjectUnitMappingRepository mappingRepo) {
        this.projectRepo = projectRepo;
        this.unitRepo = unitRepo;
        this.mappingRepo = mappingRepo;
    }

    public BusinessProject create(BusinessProjectDTO dto) {

        BusinessProject project = new BusinessProject();
        project.setName(dto.getName());

        project = projectRepo.save(project);

        for (UnitDistributionDTO u : dto.getUnits()) {

            BusinessUnit unit = unitRepo.findById(u.getUnitId())
                    .orElseThrow(() -> new RuntimeException("Unit not found"));

            ProjectUnitMapping mapping = new ProjectUnitMapping();
            mapping.setProject(project);
            mapping.setUnit(unit);
            mapping.setPercentage(u.getPercentage());

            mappingRepo.save(mapping);
        }

        return project;
    }

    public List<BusinessProjectDTO> getAll() {

        List<BusinessProject> projects = projectRepo.findAll();

        return projects.stream().map(p -> {

            BusinessProjectDTO dto = new BusinessProjectDTO();
            dto.setId(p.getId());
            dto.setName(p.getName());

            // fetch mappings
            List<ProjectUnitMapping> mappings =
                    mappingRepo.findByProjectId(p.getId());

            List<UnitDistributionDTO> units = mappings.stream().map(m -> {

                UnitDistributionDTO u = new UnitDistributionDTO();
                u.setUnitId(m.getUnit().getId());
                u.setUnitName(m.getUnit().getName()); // IMPORTANT
                u.setPercentage(m.getPercentage());

                return u;

            }).toList();

            dto.setUnits(units);

            return dto;

        }).toList();
    }

    public BusinessProjectDTO getById(Long id) {

        BusinessProject project = projectRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        BusinessProjectDTO dto = new BusinessProjectDTO();

        dto.setId(project.getId());
        dto.setName(project.getName());

        List<UnitDistributionDTO> units =
                mappingRepo.findByProjectId(project.getId())
                        .stream()
                        .map(m -> {

                            UnitDistributionDTO u = new UnitDistributionDTO();

                            u.setUnitId(m.getUnit().getId());
                            u.setUnitName(m.getUnit().getName());
                            u.setPercentage(m.getPercentage());

                            return u;

                        }).toList();

        dto.setUnits(units);

        return dto;
    }

    @Transactional
    public BusinessProject update(Long id, BusinessProjectDTO dto) {

        BusinessProject project = projectRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setName(dto.getName());

        projectRepo.save(project);

        // delete old mappings
        mappingRepo.deleteByProjectId(id);

        // save new mappings
        for (UnitDistributionDTO u : dto.getUnits()) {

            BusinessUnit unit = unitRepo.findById(u.getUnitId())
                    .orElseThrow(() -> new RuntimeException("Unit not found"));

            ProjectUnitMapping map = new ProjectUnitMapping();

            map.setProject(project);
            map.setUnit(unit);
            map.setPercentage(u.getPercentage());

            mappingRepo.save(map);
        }

        return project;
    }

    @Transactional
    public void delete(Long id) {

        if (!projectRepo.existsById(id)) {
            throw new RuntimeException("Project not found: " + id);
        }

        mappingRepo.deleteByProjectId(id); // or deleteByProjectId (based on your method)
        projectRepo.deleteById(id);
    }

}
