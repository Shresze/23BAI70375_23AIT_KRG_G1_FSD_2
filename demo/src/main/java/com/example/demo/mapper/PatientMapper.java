package com.example.demo.mapper;

import com.example.demo.dto.PatientDTO;
import com.example.demo.entity.Patient;
import org.springframework.stereotype.Component;

@Component
public class PatientMapper {

    public PatientDTO toDto(Patient patient) {
        if (patient == null) {
            return null;
        }
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setFullName(patient.getFullName());
        dto.setEmail(patient.getEmail());
        dto.setDateOfBirth(patient.getDateOfBirth());
        dto.setPhoneNumber(patient.getPhoneNumber());
        dto.setMedicalHistory(patient.getMedicalHistory());
        return dto;
    }

    public Patient toEntity(PatientDTO dto) {
        if (dto == null) {
            return null;
        }
        Patient patient = new Patient();
        patient.setId(dto.getId());
        patient.setFullName(dto.getFullName());
        patient.setEmail(dto.getEmail());
        patient.setDateOfBirth(dto.getDateOfBirth());
        patient.setPhoneNumber(dto.getPhoneNumber());
        patient.setMedicalHistory(dto.getMedicalHistory());
        return patient;
    }
}

