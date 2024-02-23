package com.capstone.backend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.jpa.Symptom;
import com.capstone.backend.repository.SymptomRepository;

@Service
public class SymptomService {

	@Autowired SymptomRepository repository;
	
	@Autowired Symptom symptom;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public Symptom addSymptom(Symptom symptom) {
		
		this.logger.info("Symptom - Service - Add Symptom: ", symptom);
		return this.repository.save(symptom);
	}
	
	public List<Symptom> getSymptom() {
		
		this.logger.info("Symptom - Service - Get Symptoms");
		return this.repository.findAll();
	}
	
	public Symptom updateSymptom(Symptom symptom, Byte id) {
		
		this.logger.info("Symptom - Service - Update Symptom ID: ", id);
		return this.repository.save(symptom);
	}
	
	public void deleteSymptom(Byte id) {
		
		this.logger.info("Symptom - Service - Remove Symptom Id: ", id);
		this.repository.deleteById(id);
	}
	
}
