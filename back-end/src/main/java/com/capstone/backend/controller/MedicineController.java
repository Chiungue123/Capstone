package com.capstone.backend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.backend.jpa.Medicine;
import com.capstone.backend.service.MedicineService;

@RestController
@RequestMapping("/medicines")
//@CrossOrigin(origins = "*")
public class MedicineController {

	@Autowired Medicine medicine;
	
	@Autowired MedicineService service;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@PostMapping("/add")
	public Medicine addMedicine(@RequestBody Medicine medicine) {
		
		logger.info("Medicine - Controller - Add Medicine: ", medicine);
		return this.service.addMedicine(medicine);
	}
	
	@GetMapping()
	public List<Medicine> getMedicine(){
		
		logger.info("Medicine - Controller - Get Medicines");
		return this.service.getMedicine();
	}
	
	@PutMapping("/update/{id}")
	public Medicine updateMedicine(@RequestBody Medicine medicine, @PathVariable("id") Byte id) {
		
		logger.info("Medicine - Controller - Update Medicine ID: ", medicine);
		return this.service.updateMedicine(id);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteMedicine(@PathVariable("id") Byte id) {
		
		logger.info("Medicine - Controller - Remove Medicine Id: ", id);
		this.service.deleteMedicine(id);
	}
}

/*
GPT Promt: 

The next step is to push the service and controller layers to github, make separate messages for each of them. 
Again, these classes aren't tested and don't have the additional validation logic required to accommodate the different table relationships but that will be the next step. 
This commit will be a reference point to fall back to if the situation presents itself

*/