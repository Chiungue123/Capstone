package com.capstone.backend.jpa;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Byte id;

    @Column(name = "ship_from", nullable = false)
    private String shipFrom;

    @Column(name = "ship_to", nullable = false)
    private String shipTo;

    @Column(name = "cost", nullable = false)
    private BigDecimal cost;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_on", nullable = false)
    private LocalDateTime createdOn;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_on", nullable = false)
    private LocalDateTime modifiedOn;

    @Column(name = "user_id", nullable = false)
    private Byte userId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;
    
	public Order() {}

	public Order(Byte id, String shipFrom, String shipTo, 
			BigDecimal cost, LocalDateTime createdOn,
			LocalDateTime modifiedOn, Byte userId, User user) {
		
		this.id = id;
		this.shipFrom = shipFrom;
		this.shipTo = shipTo;
		this.cost = cost;
		this.createdOn = createdOn;
		this.modifiedOn = modifiedOn;
		this.userId = userId;
		this.user = user;
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

	public BigDecimal getCost() {
		return cost;
	}

	public void setCost(BigDecimal cost) {
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", shipFrom=" + shipFrom + ", shipTo=" + shipTo + ", cost=" + cost + ", createdOn="
				+ createdOn + ", modifiedOn=" + modifiedOn + ", userId=" + userId + ", user=" + user + "]";
	}

}