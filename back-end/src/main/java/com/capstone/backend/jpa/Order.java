package com.capstone.backend.jpa;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Byte id;

    @Column(name = "ship_from", nullable = false)
    private String shipFrom;

    @Column(name = "ship_to", nullable = false)
    private String shipTo;

    @Column(name = "cost", nullable = false)
    private Double cost;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime modifiedOn;
    
    @Column(name = "status", nullable = false)
    private String status;
    
    @Column(name = "user_id", nullable = false)
    private Byte userId;
    
	public Order() {}

	public Order(Byte id, String shipFrom, String shipTo, 
			Double cost, LocalDateTime createdOn,
			LocalDateTime modifiedOn, String status, Byte userId) {
		
		this.id = id;
		this.shipFrom = shipFrom;
		this.shipTo = shipTo;
		this.cost = cost;
		this.createdOn = createdOn;
		this.modifiedOn = modifiedOn;
		this.status = status;
		this.userId = userId;
	}

	public Byte getId() {
		return id;
	}

	public void setId(Byte id) {
		this.id = id;
	}

	public String getShipFrom() {
		return shipFrom;
	}

	public void setShipFrom(String shipFrom) {
		this.shipFrom = shipFrom;
	}

	public String getShipTo() {
		return shipTo;
	}

	public void setShipTo(String shipTo) {
		this.shipTo = shipTo;
	}

	public Double getCost() {
		return cost;
	}

	public void setCost(Double cost) {
		this.cost = cost;
	}

	public LocalDateTime getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}

	public LocalDateTime getModifiedOn() {
		return modifiedOn;
	}

	public void setModifiedOn(LocalDateTime modifiedOn) {
		this.modifiedOn = modifiedOn;
	}

	public Byte getUserId() {
		return userId;
	}

	public void setUserId(Byte userId) {
		this.userId = userId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", shipFrom=" + shipFrom + ", shipTo=" + shipTo + ", cost=" + cost + ", createdOn="
				+ createdOn + ", modifiedOn=" + modifiedOn + ", user ID=" + userId + ", status=" + status + "]";
	}

}