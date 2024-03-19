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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.backend.jpa.MedicineSymptom;
import com.capstone.backend.service.MedicineSymptomService;

@RestController
@RequestMapping("/medicine_symptoms")
@CrossOrigin(origins = "http://localhost:4200")
public class MedicineSymptomController {
	
	@Autowired MedicineSymptomService service;
	
	// @Autowired MedicineSymptom medicineSymptom;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@PostMapping("/add")
	public MedicineSymptom addMedicineSymptom(@RequestBody MedicineSymptom medicineSymptom) {

		logger.info("MedicineSymptom - Controller - Add MedicineSymptom: ", medicineSymptom);
		return this.service.addMedicineSymptom(medicineSymptom);
	}
	
	@GetMapping()
	public List<MedicineSymptom> getMedicineSymptoms() {

		logger.info("MedicineSymptom - Controller - List MedicineSymptoms");
		return this.service.getMedicineSymptoms();
	}
	
	@PutMapping("/update/{id}")
	public MedicineSymptom updateMedicineSymptom(@PathVariable Byte id, @RequestBody MedicineSymptom medicineSymptom) {

		logger.info("MedicineSymptom - Controller - Update MedicineSymptom ID: ", id);
		return this.service.updateMedicineSymptom(id, medicineSymptom);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteMedicineSymptom(@PathVariable Byte id) {

		logger.info("MedicineSymptom - Controller - Delete MedicineSymptom ID: ", id);
		this.service.deleteMedicineSymptom(id);
	}

}
