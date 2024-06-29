package com.capstone.backend.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @EmbeddedId
    private OrderItemId id;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @MapsId("medicineId")
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;

    @Column(name = "quantity", nullable = false)
    private Byte quantity;
    
    @Column(name = "cost", nullable = false)
    private Double cost;
    
    public OrderItem() {}

    public OrderItem(OrderItemId id, Order order, Medicine medicine, Byte quantity) {
		this.id = id;
		this.order = order;
		this.medicine = medicine;
		this.quantity = quantity;
		this.cost = medicine.getPrice() * quantity;
	}

	public OrderItemId getId() {
        return id;
    }

    public void setId(OrderItemId id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public Byte getQuantity() {
        return quantity;
    }

    public void setQuantity(Byte quantity) {
        this.quantity = quantity;
    }
    
    public Double getCost() {
    	return cost;
    }

	public void setCost(Double cost) {
		this.cost = cost;
	}
	
	public String log() {
		return "Item = " + medicine.getName() + " X " + quantity;
	}

	@Override
	public String toString() {
		return "OrderItem [OrderId=" + id.getOrderId() + ", MedicineId=" + id.getMedicineId() + ", order=" + order + ", medicine=" + medicine + ", quantity=" + quantity + "]";
	}
    
}