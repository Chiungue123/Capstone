package com.capstone.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.jpa.MedicineSymptom;
import com.capstone.backend.jpa.MedicineSymptomId;
import com.capstone.backend.jpa.Symptom;
import com.capstone.backend.repository.MedicineSymptomRepository;
import com.capstone.backend.repository.SymptomRepository;

@Service
public class MedicineSymptomService {
	
	@Autowired MedicineSymptomRepository repo;
	@Autowired SymptomRepository symptomRepo;

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public List<MedicineSymptomId> addMedicineSymptoms(List<MedicineSymptomId> medicineSymptomIds) {
		
		logger.info("MedicineSymptom - Service - Add MedicineSymptom");
		
		for (MedicineSymptomId id : medicineSymptomIds) {
            this.repo.save(new MedicineSymptom(id));
        }
		
		return medicineSymptomIds;
	}

	public List<MedicineSymptom> getMedicineSymptoms() {
		
		List<MedicineSymptom> medicineSymptoms;
		
		logger.info("MedicineSymptom - Service - List MedicineSymptoms");
		
		medicineSymptoms = this.repo.findAll();
		logger.info("MedicineSymptom - Service - MedicineSymptoms: " + medicineSymptoms);
		
		return medicineSymptoms;
	}

	public List<Symptom> getSymptomsByMedicineId(Byte medicineId) {
		
		List<MedicineSymptom> medicineSymptoms = repo.findById_MedicineId(medicineId);
		
		List<Byte> symptomIds = medicineSymptoms.stream()
												.map((MedicineSymptom ms) -> ms.getId().getSymptomId())
                                                .collect(Collectors.toList());
		
		return symptomRepo.findAllById(symptomIds);
	}
	
	public void deleteMedicineSymptoms(List<MedicineSymptomId> medicineSymptomIds) {

		logger.info("MedicineSymptom - Service - Add MedicineSymptom ID: " + medicineSymptomIds);
		
		for (MedicineSymptomId id : medicineSymptomIds) {
            this.repo.delete(new MedicineSymptom(id));
        }
	}
}
