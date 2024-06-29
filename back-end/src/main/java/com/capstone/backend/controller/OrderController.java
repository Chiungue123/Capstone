package com.capstone.backend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.backend.jpa.Order;
import com.capstone.backend.jpa.OrderItem;
import com.capstone.backend.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

	@Autowired OrderService service;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@PostMapping("/add")
	public ResponseEntity<Order> addOrder(@RequestBody Order order) {
	    
		logger.info("Order - Controller - Add Order: " + order);
	    Order createdOrder = this.service.addOrder(order);
	    return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
	}
	
	@GetMapping()
	public List<Order> getOrders() {
		
		logger.info("Order - Controller - List Orders");
		return this.service.getOrders();
	}
	
	@GetMapping("/{orderId}/items")
	public List<OrderItem> getItemsForOrderId(@PathVariable Byte orderId) {
		
		logger.info("OrderItem - Controller - Get OrderItem ID: " + orderId);
		return this.service.getItemsByOrderId(orderId);
	}
	
	@PutMapping("/update")
	public Order updateOrder(@RequestBody Order order) {
		
		logger.info("Order - Controller - Update Order ID: " + order.getId());
		return this.service.updateOrder(order);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteOrder(@PathVariable("id") Byte id) {
		
		logger.info("Order - Controller - Delete Order ID: " + id);
		this.service.deleteOrder(id);
	}	
}