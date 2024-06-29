package com.capstone.backend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.jpa.Order;
import com.capstone.backend.jpa.OrderItem;
import com.capstone.backend.repository.OrderItemRepository;
import com.capstone.backend.repository.OrderRepository;

@Service
public class OrderService {
	
	@Autowired OrderItemService itemService;
	
	@Autowired OrderRepository repo;
	
	@Autowired OrderItemRepository orderItemRepo;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public Order addOrder(Order order) {
		
        logger.info("Order - Service - Add Order");
		return this.repo.save(order);
	}

	public List<OrderItem> getItemsByOrderId(Byte id) {
	    
        logger.info("Order - Service - Get Items For Order ID: " + id);
        List<OrderItem> items = this.orderItemRepo.findById_OrderId(id);
        logger.info("Order - Service - OrderItems: " + items);
        return items;
    }

	public List<Order> getOrders() {
		
        logger.info("Order - Service - List Orders");
		List<Order> orders = this.repo.findAll();
		logger.info("Order - Service - Orders: " + orders);
		return orders;
	}
	
	public Order getOrder(Byte id) {

		logger.info("Order - Service - Get Order ID: " + id);
		return this.repo.findById(id).orElse(null);
	}
	
	public Order updateOrder(Order order) {
	    
		logger.info("Order - Service - Update Order ID: " + order.getId());

	    // Use the map function to transform the value if present, otherwise return an empty Optional
	    return this.repo.findById(order.getId()).map(existingOrder -> {
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
		
        logger.info("Order - Service - Delete Order");
        
        // Find all order items according to the order ID
        List<OrderItem> items = this.orderItemRepo.findById_OrderId(id);
        
        // Delete all order items
        this.orderItemRepo.deleteAll(items);
        
        // Delete the order
		this.repo.deleteById(id);
	}
}