package com.example.business.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "project_unit_mapping")
@Getter
@Setter
public class ProjectUnitMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private BusinessProject project;

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private BusinessUnit unit;

    private Integer percentage;
}
