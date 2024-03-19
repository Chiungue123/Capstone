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

import com.capstone.backend.jpa.User;
import com.capstone.backend.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	/*
	 * MIGRATE TO RESPONSEENTITY<> AFTERWARDS
	 */
	
	@Autowired UserService service;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@PostMapping("/add")
	public User addUser(@RequestBody User user) {
		
		logger.info("User - Controller - Add User: ", user);
		return this.service.addUser(user);
	}
	
	@GetMapping()
	public List<User> getUsers() {
		
		logger.info("User - Controller - Get Owners");
		return this.service.getUsers();
	}
	
	@PutMapping("/update/{id}")
	public User updateUser(@RequestBody User user, @PathVariable("id") Byte id) {
		
		logger.info("User - Controller - Update User ID: ", id, user);
		return this.service.updateUser(id, user);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteUser(@PathVariable("id") Byte id) {
		
		logger.info("User - Controller - Delete User id: ", id);
		this.service.deleteUser(id);
	}
	
}
