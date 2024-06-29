package com.capstone.backend.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "medicine")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Byte id;

    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "brand", nullable = false)
    private String brand;

    @Column(name = "stock", nullable = false)
    private Integer stock;

	public Medicine() {}
	
	public Medicine(Byte id, String name, String brand, Integer stock) {
		this.id = id;
		this.name = name;
		this.brand = brand;
		this.stock = stock;
	}
	
    public Byte getId() {
        return id;
    }

    public void setId(Byte id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
	public Double getPrice() {
		return price;
	}
	
	public void setPrice(Double price) {
		this.price = price;
	}

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

	@Override
	public String toString() {
		return "Medicine [id=" + id + ", name=" + name + ", brand=" + brand + ", stock=" + stock + "]";
	}
   
}