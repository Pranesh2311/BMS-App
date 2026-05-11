package com.example.business.controller;

import com.example.business.dto.BusinessProjectDTO;
import com.example.business.entity.BusinessProject;
import com.example.business.service.BusinessProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business-projects")
@CrossOrigin(origins = "*") // allow React
public class BusinessProjectController {

    private final BusinessProjectService service;

    public BusinessProjectController(BusinessProjectService service) {
        this.service = service;
    }

    @PostMapping
    public BusinessProject create(@RequestBody BusinessProjectDTO dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<BusinessProjectDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public BusinessProjectDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public BusinessProject update(@PathVariable Long id,
                                  @RequestBody BusinessProjectDTO dto) {

        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
