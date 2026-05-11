package com.example.business.service;

import com.example.business.dto.ProjectDetailsDTO;
import com.example.business.dto.ProjectPhaseDTO;
import com.example.business.entity.ProjectDetails;
import com.example.business.entity.ProjectPhase;
import com.example.business.repository.ProjectDetailsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProjectDetailsService {

    private final ProjectDetailsRepository repo;

    public ProjectDetailsService(ProjectDetailsRepository repo) {
        this.repo = repo;
    }

    public ProjectDetails save(ProjectDetailsDTO dto) {

        ProjectDetails p = new ProjectDetails();

        p.setProjectName(dto.getProjectName());
        p.setCategory(dto.getCategory());
        p.setProjectManager(dto.getProjectManager());
        p.setClientName(dto.getClientName());
        p.setProjectAlternateName(dto.getProjectAlternateName());
        p.setProjectWBS(dto.getProjectWBS());
        p.setOverAllValue(dto.getOverAllValue());

        List<ProjectPhase> phases = dto.getPhases().stream().map(x -> {

            ProjectPhase phase = new ProjectPhase();

            phase.setPhase(x.getPhase());
            phase.setValue(x.getValue());
            phase.setStartDate(x.getStartDate());
            phase.setEndDate(x.getEndDate());
            phase.setTeamSize(x.getTeamSize());
            phase.setFrequency(x.getFrequency());

            phase.setProject(p);

            return phase;

        }).toList();

        p.setPhases(phases);

        return repo.save(p);
    }

    public List<ProjectDetails> getAll() {
        return repo.findAll();
    }

    @Transactional
    public ProjectDetails update(Long id, ProjectDetails dto) {

        ProjectDetails project = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not Found"));

        project.setProjectName(dto.getProjectName());
        project.setCategory(dto.getCategory());
        project.setProjectManager(dto.getProjectManager());
        project.setClientName(dto.getClientName());
        project.setProjectAlternateName(dto.getProjectAlternateName());
        project.setProjectWBS(dto.getProjectWBS());
        project.setOverAllValue(dto.getOverAllValue());

        // clear old phases
        project.getPhases().clear();

        // add new phases
        for (ProjectPhase p : dto.getPhases()) {

            p.setProject(project);

            project.getPhases().add(p);
        }

        return repo.save(project);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}