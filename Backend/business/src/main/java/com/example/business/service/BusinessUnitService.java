package com.example.business.service;

import com.example.business.dto.BusinessUnitDTO;
import com.example.business.entity.BusinessUnit;
import com.example.business.entity.BusinessVertical;
import com.example.business.repository.BusinessUnitRepository;
import com.example.business.repository.BusinessVerticalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessUnitService {

    private final BusinessUnitRepository repo;
    private final BusinessVerticalRepository verticalRepo;

    public BusinessUnitService(BusinessUnitRepository repo,
                               BusinessVerticalRepository verticalRepo) {
        this.repo = repo;
        this.verticalRepo = verticalRepo;
    }

    public BusinessUnit save(BusinessUnitDTO dto) {

        if (dto.getBusinessVerticalId() == null) {
            throw new RuntimeException("Business Vertical ID is required");
        }

        BusinessVertical vertical = verticalRepo.findById(dto.getBusinessVerticalId())
                .orElseThrow(() -> new RuntimeException("Vertical not found with id: " + dto.getBusinessVerticalId()));

        BusinessUnit unit = new BusinessUnit();
        unit.setName(dto.getName());
        unit.setBusinessVertical(vertical);

        return repo.save(unit);
    }

    public List<BusinessUnitDTO> getAll() {
        return repo.findAll().stream().map(u -> {
            BusinessUnitDTO dto = new BusinessUnitDTO();
            dto.setId(u.getId());
            dto.setName(u.getName());
            dto.setStatus(u.getStatus());

            if (u.getBusinessVertical() != null) {
                dto.setVerticalName(u.getBusinessVertical().getName());
                dto.setBusinessVerticalId(u.getBusinessVertical().getId());
            } else {
                dto.setVerticalName("N/A");
            }

            return dto;
        }).toList();
    }

    public BusinessUnit update(Long id, BusinessUnitDTO dto) {

        BusinessUnit unit = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Unit not found with id: " + id));

        if (dto.getBusinessVerticalId() == null) {
            throw new RuntimeException("Business Vertical ID is required");
        }

        BusinessVertical vertical = verticalRepo.findById(dto.getBusinessVerticalId())
                .orElseThrow(() -> new RuntimeException("Vertical not found"));

        unit.setName(dto.getName());
        unit.setBusinessVertical(vertical);

        return repo.save(unit);
    }

    /*public void delete(Long id) {
        BusinessUnit unit = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        unit.setStatus("N"); // soft delete
        repo.save(unit);
    }*/

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
