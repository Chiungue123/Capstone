package com.capstone.backend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.backend.jpa.MedicineSymptom;
import com.capstone.backend.jpa.MedicineSymptomId;
import com.capstone.backend.jpa.Symptom;
import com.capstone.backend.service.MedicineSymptomService;

@RestController
@RequestMapping("/medicine_symptoms")
@CrossOrigin(origins = "http://localhost:4200")
public class MedicineSymptomController {
	
	@Autowired MedicineSymptomService service;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@PostMapping("/add")
	public List<MedicineSymptomId>  addMedicineSymptom(@RequestBody List<MedicineSymptomId> medicineSymptoms) {

		logger.info("MedicineSymptom - Controller - Add MedicineSymptom: {}", medicineSymptoms.toString());
		return this.service.addMedicineSymptoms(medicineSymptoms);
	}
	
	@GetMapping()
	public List<MedicineSymptom> getMedicineSymptoms() {

		logger.info("MedicineSymptom - Controller - List MedicineSymptoms");
		return this.service.getMedicineSymptoms();
	}
	
	@GetMapping("/medicine/{id}")
	public List<Symptom> getMedicineSymptom(@PathVariable Byte id) {

		logger.info("MedicineSymptom - Controller - Get Symptoms by Medicine ID: " + id);
		return this.service.getSymptomsByMedicineId(id);
	}
	
	@DeleteMapping("/delete")
	public void deleteSymptomsByMedicineId(@RequestBody List<MedicineSymptomId> medicineSymptoms) {

		logger.info("MedicineSymptom - Controller - Delete Symptom IDs for Medicine ID: " + medicineSymptoms.toString());
		this.service.deleteMedicineSymptoms(medicineSymptoms);
	}
	
}