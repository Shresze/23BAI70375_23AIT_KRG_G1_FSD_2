package com.example.demo.service;

import com.example.demo.dto.PatientDTO;
import com.example.demo.entity.Patient;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.PatientMapper;
import com.example.demo.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

    public PatientServiceImpl(PatientRepository patientRepository, PatientMapper patientMapper) {
        this.patientRepository = patientRepository;
        this.patientMapper = patientMapper;
    }

    @Override
    public PatientDTO createPatient(PatientDTO patientDTO) {
        Patient patient = patientMapper.toEntity(patientDTO);
        Patient saved = patientRepository.save(patient);
        return patientMapper.toDto(saved);
    }

    @Override
    public PatientDTO getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));
        return patientMapper.toDto(patient);
    }

    @Override
    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll()
                .stream()
                .map(patientMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public PatientDTO updatePatient(Long id, PatientDTO patientDTO) {
        Patient existing = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));

        existing.setFullName(patientDTO.getFullName());
        existing.setEmail(patientDTO.getEmail());
        existing.setDateOfBirth(patientDTO.getDateOfBirth());
        existing.setPhoneNumber(patientDTO.getPhoneNumber());
        existing.setMedicalHistory(patientDTO.getMedicalHistory());

        Patient updated = patientRepository.save(existing);
        return patientMapper.toDto(updated);
    }

    @Override
    public void deletePatient(Long id) {
        Patient existing = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));
        patientRepository.delete(existing);
    }
}

