package com.capstone.backend.service;

import java.time.LocalDateTime;
import java.util.Arrays;
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
	
	@Autowired UserRepository repo;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public User addUser(User user) {
		
		logger.info("User - Service - Add User: " + user.toString());
		return this.repo.save(user);
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
		
		this.repo.findById(id).ifPresent(u -> {
            u.setFirstName(user.getFirstName());
            u.setLastName(user.getLastName());
            u.setUsername(user.getUsername());
            u.setEmail(user.getEmail());
            u.setAddress(user.getAddress());
            u.setPhone(user.getPhone());
            u.setIsAdmin(user.getIsAdmin());
            u.setCreatedOn(user.getCreatedOn());
            u.setModifiedOn(LocalDateTime.now());
            this.repo.save(u);
        });
		
		return this.repo.findById(id).get();
	}

	public void deleteUser(Byte id) {
		
		logger.info("User - Service - Delete User");
		this.repo.deleteById(id);
	}	
	
}