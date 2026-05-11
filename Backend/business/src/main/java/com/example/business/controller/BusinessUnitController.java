package com.example.business.controller;

import com.example.business.dto.BusinessUnitDTO;
import com.example.business.entity.BusinessUnit;
import com.example.business.service.BusinessUnitService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business-units")
@CrossOrigin(origins = "*") // allow React
public class BusinessUnitController {

    private final BusinessUnitService service;

    public BusinessUnitController(BusinessUnitService service) {
        this.service = service;
    }

    @PostMapping
    public BusinessUnit create(@RequestBody BusinessUnitDTO dto) {
        return service.save(dto);
    }

    @GetMapping
    public List<BusinessUnitDTO> getAll() {
        return service.getAll();
    }

    @PutMapping("/{id}")
    public BusinessUnit update(@PathVariable Long id,
                               @RequestBody BusinessUnitDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}
