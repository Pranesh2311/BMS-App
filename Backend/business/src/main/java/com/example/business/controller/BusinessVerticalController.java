package com.example.business.controller;

import com.example.business.entity.BusinessVertical;
import com.example.business.service.BusinessVerticalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business-verticals")
@CrossOrigin(origins = "*") // allow React
public class BusinessVerticalController {

    private final BusinessVerticalService service;

    public BusinessVerticalController(BusinessVerticalService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody BusinessVertical bv) {
        try {
            return ResponseEntity.ok(service.save(bv));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public List<BusinessVertical> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public BusinessVertical getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public BusinessVertical update(@PathVariable Long id, @RequestBody BusinessVertical bv) {
        return service.update(id, bv);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
