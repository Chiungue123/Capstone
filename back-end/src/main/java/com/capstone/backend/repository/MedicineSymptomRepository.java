package com.capstone.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.backend.jpa.MedicineSymptom;

public interface MedicineSymptomRepository extends JpaRepository<MedicineSymptom, Byte> {

	List<MedicineSymptom> findById_MedicineId(Byte medicineId);
}