package com.capstone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.backend.jpa.Symptom;

public interface SymptomRepository extends JpaRepository<Symptom, Byte> {

}
