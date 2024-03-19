package com.capstone.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.backend.jpa.User;
import com.capstone.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired AuthService service;
	
	@PostMapping("/login")
	public User login(@RequestBody User user) {

		logger.info("Auth - Controller - Login");
		
		return this.service.login(user);
	}
	
	@PostMapping("/validate")
	public User validate(@RequestBody User user) {

		logger.info("Auth - Controller - Validating User: ", user);
		
		if (this.service.validateAuth(user)) {
			
			return user;
		}
		
		return null;	
	}
	
	@PostMapping("/register")
	public User register(@RequestBody User user) {

		logger.info("Auth - Controller - Register User: ", user);
		
		return this.service.register(user);
	}
	
	@PostMapping("/logout")
	public void logout() {

		logger.info("Auth - Controller - Logout");
		
		this.service.logout();
	}
}