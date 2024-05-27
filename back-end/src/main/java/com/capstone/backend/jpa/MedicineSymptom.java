package com.capstone.backend.jpa;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "medicine_symptom")
public class MedicineSymptom {
    
	@EmbeddedId
    private MedicineSymptomId id;

    public MedicineSymptom() {}

    public MedicineSymptom(MedicineSymptomId id) {
        this.id = id;
    }

    public MedicineSymptomId getId() {
        return id;
    }

    public void setId(MedicineSymptomId id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "MedicineSymptom{" +
                "id=" + id +
                '}';
    }
}