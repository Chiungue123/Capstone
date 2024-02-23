package com.capstone.backend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.jpa.User;
import com.capstone.backend.repository.UserRepository;

@Service
public class UserService {
	
	/*
	 * USE THE OPTIONAL CLASS
	 */

	@Autowired User user;
	
	@Autowired UserRepository repo;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public User addUser(User user) {
		
		logger.info("User - Service - Add Owner");
		return null;
	}
	
	public List<User> getUsers() {
		
		logger.info("User - Service - Get Owners");
		return null;
	}

	public User updateUser(Byte id, User user) {
		
		logger.info("User - Service - Update Owner");
		return null;
	}

	public void deleteUser(Byte id) {
		
		logger.info("User - Service - Delete Owner");
		this.repo.deleteById(id);
	}	
	
	/*
	 * 	Verification
	 * - Validate new users and their attributes
	 * 	# When deleting a user, check for orders that are placed for this user. 
	 * 	# End user needs to be notified to deal with this
	 *  # Either delete the other orders or cancel the removal of the user
	 */
}
