package com.capstone.backend.jpa;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "medicine_symptom")
public class MedicineSymptom {
	
    @EmbeddedId
    private MedicineSymptomId id;

    @ManyToOne
    @JoinColumn(name = "medicine_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Medicine medicine;

    @ManyToOne
    @JoinColumn(name = "symptom_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Symptom symptom;

    // getters and setters

    public MedicineSymptomId getId() {
        return id;
    }

    public void setId(MedicineSymptomId id) {
        this.id = id;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public Symptom getSymptom() {
        return symptom;
    }

    public void setSymptom(Symptom symptom) {
        this.symptom = symptom;
    }
}

@Embeddable
class MedicineSymptomId implements Serializable { // CHANGED FROM PUBLIC TO DEFAULT ACCESS MODIFIER //
	
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
	public String toString() {
		return "MedicineSymptomId [medicineId=" + medicineId + ", symptomId=" + symptomId + "]";
	}

}