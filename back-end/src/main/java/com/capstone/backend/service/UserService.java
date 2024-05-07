package com.capstone.backend.service;

import java.time.LocalDateTime;
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

	// @Autowired User user;
	
	@Autowired UserRepository repo;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public User addUser(User user) {
		
		logger.info("User - Service - Add Users");
		return null;
	}
	
	public List<User> getUsers() {
		
		logger.info("User - Service - Get Users");
		return this.repo.findAll();
	}
	
	public User getUser(Byte id) {

		logger.info("User - Service - Get User ID: " + id);
		return this.repo.findAll().stream().filter(user -> user.getId() == id).findFirst().orElse(null);
	}

	public User updateUser(Byte id, User user) {
		
		logger.info("User - Service - Update User ID: " + id);
		logger.info("User - Service - Updating User Info: " + user.toString());
		return null;
	}

	public void deleteUser(Byte id) {
		
		logger.info("User - Service - Delete User");
		this.repo.deleteById(id);
	}	
	
	public List<User> generateTest() {

		logger.info("User - Service - Generate Test Users");
		User user1 = new User((byte) 1, "John", "Doe", "johndoe", "password", "email", "address", "phone", false, LocalDateTime.now(), LocalDateTime.now());
		
		return List.of(user1);
	}
	
	/*private boolean validateUser(User user) {

		logger.info("User - Service - Validate User");
		
		
		
	}*/
	
	/*
	 * 	Verification
	 * - Validate new users and their attributes
	 * 	# When deleting a user, check for orders that are placed for this user. 
	 * 	# End user needs to be notified to deal with this
	 *  # Either delete the other orders or cancel the removal of the user
	 */
}
