package com.capstone.backend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.jpa.Symptom;
import com.capstone.backend.jpa.User;
import com.capstone.backend.repository.SymptomRepository;

@Service
public class SymptomService {

	@Autowired SymptomRepository repo;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public Symptom addSymptom(Symptom symptom) {
		
		this.logger.info("Symptom - Service - Add Symptom: " + symptom);
		return this.repo.save(symptom);
	}
	
	public List<Symptom> getSymptoms() {
		
		this.logger.info("Symptom - Service - Get Symptoms");
		return this.repo.findAll();
	}
	
	public Symptom getSymptom(Byte id) {

		logger.info("User - Service - Get User ID: " + id);
		return this.repo.findAll().stream().filter(symptom -> symptom.getId() == id).findFirst().orElse(null);
	}
	
	public Symptom updateSymptom(Symptom symptom, Byte id) {
		
		this.logger.info("Symptom - Service - Update Symptom ID: " + id);
		
		this.repo.findById(id).ifPresent(s -> {
		
			s.setDescription(symptom.getDescription());
			this.repo.save(s);
		});
		
		return this.repo.findById(id).get();
	}
	
	public void deleteSymptom(Byte id) {
		
		this.logger.info("Symptom - Service - Remove Symptom Id: " + id);
		this.repo.deleteById(id);
	}
	
}
