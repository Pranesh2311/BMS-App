package com.example.business.service;

import com.example.business.entity.Employee;
import com.example.business.exception.BusinessException;
import com.example.business.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    // CREATE
    public Employee create(Employee emp) {
        return repo.save(emp);
    }

    // GET ALL
    public List<Employee> getAll() {
        return repo.findAll();
    }

    // GET BY ID
    public Employee getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() ->
                        new BusinessException("Employee not found", "EMP_NOT_FOUND"));
    }

    // UPDATE
    public Employee update(Long id, Employee emp) {

        Employee existing = repo.findById(id)
                .orElseThrow(() ->
                        new BusinessException("Employee not found", "EMP_NOT_FOUND"));

        existing.setEmployeeName(emp.getEmployeeName());
        existing.setEmployeeCode(emp.getEmployeeCode());
        existing.setDesignation(emp.getDesignation());
        existing.setMobileNumber(emp.getMobileNumber());
        existing.setEmail(emp.getEmail());
        existing.setAddress(emp.getAddress());

        return repo.save(existing);
    }

    // DELETE
    public void delete(Long id) {

        Employee existing = repo.findById(id)
                .orElseThrow(() ->
                        new BusinessException("Employee not found", "EMP_NOT_FOUND"));

        repo.delete(existing);
    }
}
