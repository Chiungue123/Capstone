package com.capstone.backend.jpa;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
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

    public OrderItem(OrderItemId id, Order order, Medicine medicine, Byte quantity, Double cost) {
		super();
		this.id = id;
		this.order = order;
		this.medicine = medicine;
		this.quantity = quantity;
		this.cost = cost;
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

	@Override
	public String toString() {
		return "OrderItem [id=" + id + ", order=" + order + ", medicine=" + medicine + ", quantity=" + quantity + "]";
	}
    
}

@Embeddable
class OrderItemId implements Serializable {

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