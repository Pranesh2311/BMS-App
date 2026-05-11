package com.example.business.dto;

public class UnitDistributionDTO {
    private Long unitId;

    private String unitName;
    private Integer percentage;

    public Long getUnitId() {
        return unitId;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public void setUnitId(Long unitId) {
        this.unitId = unitId;
    }

    public Integer getPercentage() {
        return percentage;
    }

    public void setPercentage(Integer percentage) {
        this.percentage = percentage;
    }
}
