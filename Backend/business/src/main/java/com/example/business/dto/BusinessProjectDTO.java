package com.example.business.dto;

import java.util.List;

public class BusinessProjectDTO {

    private Long id;
    private String name;
    private List<UnitDistributionDTO> units;

    // getters/setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<UnitDistributionDTO> getUnits() {
        return units;
    }

    public void setUnits(List<UnitDistributionDTO> units) {
        this.units = units;
    }
}
