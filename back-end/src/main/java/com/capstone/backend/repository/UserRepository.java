package com.capstone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.backend.jpa.User;

public interface UserRepository extends JpaRepository<User, Byte>{

}
