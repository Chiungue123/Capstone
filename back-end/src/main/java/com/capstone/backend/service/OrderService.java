package com.capstone.backend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.capstone.backend.jpa.Order;
import com.capstone.backend.repository.OrderRepository;

public class OrderService {
	
	@Autowired OrderRepository repo;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public Order addOrder(Order order) {
		
        logger.info("Order - Service - Add Order");
		return this.repo.save(order);
	}

	public List<Order> getOrders() {
		
        logger.info("Order - Service - List Orders");
		return this.repo.findAll();
	}
	
	public Order updateOrder(Byte id, Order order) {
	    logger.info("Order - Service - Update Order ID: " + id);

	    // Use the map function to transform the value if present, otherwise return an empty Optional
	    return this.repo.findById(id).map(existingOrder -> {
	        existingOrder.setShipFrom(order.getShipFrom());
	        existingOrder.setShipTo(order.getShipTo());
	        existingOrder.setCost(order.getCost());
	        existingOrder.setCreatedOn(order.getCreatedOn());
	        existingOrder.setModifiedOn(order.getModifiedOn());
	        existingOrder.setUserId(order.getUserId());
	        
	        // Save the updated order and return it
	        return this.repo.save(existingOrder);
	        
	    }).orElse(null); // Return null if the order with the specified ID does not exist
	}


	public void deleteOrder(Byte id) {
		
        logger.info("Order - Service - Add Order");
		this.repo.deleteById(id);
	}

}
