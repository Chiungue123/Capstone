package com.capstone.backend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.jpa.MedicineSymptom;
import com.capstone.backend.repository.MedicineSymptomRepository;

@Service
public class MedicineSymptomService {
	
	@Autowired MedicineSymptomRepository repo;

	// @Autowired MedicineSymptom medicineSymptom;

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public MedicineSymptom addMedicineSymptom(MedicineSymptom medicineSymptom) {

		logger.info("MedicineSymptom - Service - Add MedicineSymptom");
		return this.repo.save(medicineSymptom);
	}

	public List<MedicineSymptom> getMedicineSymptoms() {

		logger.info("MedicineSymptom - Service - List MedicineSymptoms");
		return this.repo.findAll();
	}

	public MedicineSymptom updateMedicineSymptom(Byte id, MedicineSymptom medicineSymptom) {

		logger.info("MedicineSymptom - Service - Update MedicineSymptom ID: ", id);

		return this.repo.findById(id).map(exsistingItem -> {
			exsistingItem.setId(medicineSymptom.getId());
			exsistingItem.setMedicine(medicineSymptom.getMedicine());
			exsistingItem.setSymptom(medicineSymptom.getSymptom());

			return this.repo.save(exsistingItem);

		}).orElse(null);
	}

	public void deleteMedicineSymptom(Byte id) {

		logger.info("MedicineSymptom - Service - Add MedicineSymptom");
		this.repo.deleteById(id);
	}
}
