package com.example.demo.service;

import com.example.demo.dto.PatientDTO;

import java.util.List;

public interface PatientService {

    PatientDTO createPatient(PatientDTO patientDTO);

    PatientDTO getPatientById(Long id);

    List<PatientDTO> getAllPatients();

    PatientDTO updatePatient(Long id, PatientDTO patientDTO);

    void deletePatient(Long id);
}

