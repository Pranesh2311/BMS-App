package com.example.business.dto;

public class BusinessUnitDTO {

    private Long id;
    private String name;
    private String status;
    private String verticalName;
    private Long businessVerticalId;

    // getters & setters

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getVerticalName() {
        return verticalName;
    }

    public void setVerticalName(String verticalName) {
        this.verticalName = verticalName;
    }

    public Long getBusinessVerticalId() {
        return businessVerticalId;
    }

    public void setBusinessVerticalId(Long businessVerticalId) {
        this.businessVerticalId = businessVerticalId;
    }
}
