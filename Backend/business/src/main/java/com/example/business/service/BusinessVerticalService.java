package com.example.business.service;

import com.example.business.entity.BusinessVertical;
import com.example.business.exception.BusinessException;
import com.example.business.repository.BusinessVerticalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BusinessVerticalService {

    private final BusinessVerticalRepository repo;

    public BusinessVerticalService(BusinessVerticalRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public BusinessVertical save(BusinessVertical bv) {

        // Step 1: make all existing records inactive
        repo.deactivateAll();

        // Step 2: set new record active
        bv.setStatus("Y");

        return repo.save(bv);
    }

    public List<BusinessVertical> getAll() {
        return repo.findAll();
    }

    public BusinessVertical getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new BusinessException("Business Vertical not found", "BV_NOT_FOUND"));
    }

    @Transactional
    public BusinessVertical update(Long id, BusinessVertical bv) {

        BusinessVertical existing = repo.findById(id)
                .orElseThrow(() -> new BusinessException("Record not found with id: " + id, "BV_NOT_FOUND"));

        existing.setName(bv.getName());

        // If user is trying to set status = Y
        if ("Y".equalsIgnoreCase(bv.getStatus())) {
            repo.deactivateAll(); // make others N
            existing.setStatus("Y");
        } else {
            existing.setStatus("N");
        }

        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
