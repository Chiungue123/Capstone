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

import com.capstone.backend.jpa.Symptom;
import com.capstone.backend.service.SymptomService;

@RestController
@RequestMapping("/symptoms")
@CrossOrigin(origins = "http://localhost:4200")
public class SymptomController {

	@Autowired SymptomService service;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@PostMapping("/add")
	public Symptom addSymptom(@RequestBody Symptom symptom) {
		
		logger.info("Symptom - Controller - Add Symptom: " + symptom);
		return service.addSymptom(symptom);
	}
	
	@GetMapping()
	public List<Symptom> getSymptoms(){
		
		logger.info("Symptom - Controller - Get Symptoms");
        return service.getSymptoms();
    }
	
	@PutMapping("/update/{id}")
	public Symptom updateSymptom(@RequestBody Symptom symptom, @PathVariable("id") Byte id) {
		
		logger.info("Symptom - Controller - Update Symptom ID: " + id);
		return service.updateSymptom(symptom, id);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteSymptom(@PathVariable("id") Byte id) {
		
		logger.info("Symptom - Controller - Remove Symptom Id: " + id);
		service.deleteSymptom(id);
	}
}
