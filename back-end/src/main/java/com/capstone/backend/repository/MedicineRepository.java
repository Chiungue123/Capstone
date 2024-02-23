package com.capstone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.backend.jpa.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Byte>{

}
