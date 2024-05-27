package com.capstone.backend.jpa;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;

public class MedicineSymptomId implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "medicine_id")
    private Byte medicineId;

    @Column(name = "symptom_id")
    private Byte symptomId;

    public MedicineSymptomId() {}

    public MedicineSymptomId(Byte medicineId, Byte symptomId) {
        this.medicineId = medicineId;
        this.symptomId = symptomId;
    }

    public Byte getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Byte medicineId) {
        this.medicineId = medicineId;
    }

    public Byte getSymptomId() {
        return symptomId;
    }

    public void setSymptomId(Byte symptomId) {
        this.symptomId = symptomId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MedicineSymptomId that = (MedicineSymptomId) o;
        return Objects.equals(medicineId, that.medicineId) && Objects.equals(symptomId, that.symptomId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(medicineId, symptomId);
    }

    @Override
    public String toString() {
        return "MedicineSymptomId{" +
                "medicineId = " + medicineId +
                ", symptomId = " + symptomId +
                "}";
    }
}