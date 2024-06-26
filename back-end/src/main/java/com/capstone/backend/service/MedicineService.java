package com.capstone.backend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.jpa.Medicine;
import com.capstone.backend.repository.MedicineRepository;

@Service
public class MedicineService {
	
	@Autowired MedicineRepository repo;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public Medicine addMedicine(Medicine medicine) {
		
		logger.info("Medicine - Service - Add Medicine");
		return this.repo.save(medicine);
	}

	public List<Medicine> getMedicine() {
		
		logger.info("Medicine - Service - Get Medicines");
		return this.repo.findAll();
	}

	public Medicine updateMedicine(Byte id, Medicine medicine) {
		
		logger.info("Medicine - Service - Update Medicine ID: " + id);
		this.repo.findById(id).ifPresent( m -> {
			m.setName(medicine.getName());
			m.setPrice(medicine.getPrice());
			m.setBrand(medicine.getBrand());
			m.setStock(medicine.getStock());
			
		    this.repo.save(m);
		});
		
		return this.repo.findById(id).get();
	}

	public void deleteMedicine(Byte id) {
		
		logger.info("Medicine - Service - Delete Medicine ID: " + id);
		this.repo.deleteById(id);
	}
	
	/*
	 * VALIDATION
	 * 
	 * - When deleting an order, we can delete the medicine without affecting the order because it was already ordered
	 * - No table relationships for medicine
	 * - Validation when updating and adding new medicine
	 * - Consider using the optional class
	 * 
	 */
}