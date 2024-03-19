package com.capstone.backend.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.jpa.User;
import com.capstone.backend.repository.UserRepository;

@Service
public class AuthService {
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired UserRepository repo;

	public User login(User user) {
		
	    logger.info("Auth - Service - Login: {}", user.toString());

	    if (this.validateUser(user)) {
	        Optional<User> matchingUser = this.repo.findAll().stream()
	                .filter(u -> u.getEmail().equals(user.getEmail()) && u.getPassword().equals(user.getPassword()))
	                .findFirst();
	        
	        return matchingUser.orElse(null);
	    }
	    
	    return null;
	}

	
	public User register(User user) {

		logger.info("Auth - Service - Register New User: ", user.toString());
		
		if (this.validateUser(user)) {
			
			return this.repo.save(user);
		}
		
		return null;
	}

	public Boolean validateAuth(User user) {
		
		logger.info("Auth - Service - Validating User Email: ", user.getEmail());
		
		boolean isDuplicate = false;
		
		User duplicateUser = this.repo.findAll().stream().filter(u -> u.getEmail().equals(user.getEmail())).findFirst().orElse(null);
		
		if (duplicateUser != null) {
			
			isDuplicate = true;
		}
		
		if (!isDuplicate ||
			user.getEmail() != null || 
			user.getEmail() != "" ||
			user.getEmail().contains("@")) {
			
			return true;
		}
		
		return null;
	}
	
	private Boolean validateUser(User user) {
		
		logger.info("Auth - Service - Validating User: ", user.toString());
		
		if (
			user.getFirstName() != null && user.getFirstName() != "" &&
			user.getLastName() != null && user.getLastName() != "" &&
			user.getUsername() != null && user.getUsername().length() > 0 &&
			user.getEmail() != null && user.getEmail().contains("@") &&
			user.getPassword() != null && user.getPassword().length() >= 8 &&
			user.getCreatedOn() != null &&
			user.getModifiedOn() != null &&
			user.getIsAdmin() != null
		) {
			return true;
		
		} else {
			
			return false;
		}
	}
	
	public void logout() {

		logger.info("Auth - Service - Logout");
	}
}