package com.example.business.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "project_phase")
@Getter
@Setter
public class ProjectPhase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phase;
    private String value;

    private String startDate;
    private String endDate;

    private String teamSize;
    private String frequency;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "project_id")
    private ProjectDetails project;
}