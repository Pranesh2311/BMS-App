package com.example.business.controller;

import com.example.business.dto.ProjectDetailsDTO;
import com.example.business.entity.ProjectDetails;
import com.example.business.repository.ProjectDetailsRepository;
import com.example.business.service.ProjectDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project-details")
@CrossOrigin(origins = "*")
public class ProjectDetailsController {

    @Autowired
    private ProjectDetailsRepository projectDetailsRepository;
    private final ProjectDetailsService service;

    public ProjectDetailsController(ProjectDetailsService service) {
        this.service = service;
    }

    @PostMapping
    public ProjectDetails create(@RequestBody ProjectDetailsDTO dto) {
        return service.save(dto);
    }

    @GetMapping
    public List<ProjectDetails> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDetails> getById(@PathVariable Long id) {

        ProjectDetails project =
                projectDetailsRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Not Found"));

        return ResponseEntity.ok(project);
    }

    @PutMapping("/{id}")
    public ProjectDetails update(
            @PathVariable Long id,
            @RequestBody ProjectDetails project) {

        return service.update(id, project);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}