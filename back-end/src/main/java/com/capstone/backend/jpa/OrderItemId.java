package com.capstone.backend.jpa;

import java.io.Serializable;
import jakarta.persistence.Column;

public class OrderItemId implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Column(name = "orders_id")
    private Byte orderId;

    @Column(name = "medicine_id")
    private Byte medicineId;

    public OrderItemId() {}

    public OrderItemId(Byte orderId, Byte medicineId) {
        this.orderId = orderId;
        this.medicineId = medicineId;
    }

    public Byte getOrderId() {
        return orderId;
    }

    public void setOrderId(Byte orderId) {
        this.orderId = orderId;
    }

    public Byte getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Byte medicineId) {
        this.medicineId = medicineId;
    }
}