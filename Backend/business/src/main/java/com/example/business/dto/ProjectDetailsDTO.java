package com.example.business.dto;

import java.util.List;

public class ProjectDetailsDTO {

    private Long id;

    private String projectName;
    private String category;
    private String projectManager;
    private String clientName;
    private String projectAlternateName;
    private String projectWBS;
    private String overAllValue;

    private List<ProjectPhaseDTO> phases;

    // getters setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProjectManager() {
        return projectManager;
    }

    public void setProjectManager(String projectManager) {
        this.projectManager = projectManager;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getProjectAlternateName() {
        return projectAlternateName;
    }

    public void setProjectAlternateName(String projectAlternateName) {
        this.projectAlternateName = projectAlternateName;
    }

    public String getProjectWBS() {
        return projectWBS;
    }

    public void setProjectWBS(String projectWBS) {
        this.projectWBS = projectWBS;
    }

    public String getOverAllValue() {
        return overAllValue;
    }

    public void setOverAllValue(String overAllValue) {
        this.overAllValue = overAllValue;
    }

    public List<ProjectPhaseDTO> getPhases() {
        return phases;
    }

    public void setPhases(List<ProjectPhaseDTO> phases) {
        this.phases = phases;
    }
}