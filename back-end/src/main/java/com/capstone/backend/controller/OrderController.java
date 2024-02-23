package com.capstone.backend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.backend.jpa.Order;
import com.capstone.backend.service.OrderService;

@RestController
@RequestMapping("/orders")
//@CrossOrigin(origins = "*")
public class OrderController {

	@Autowired OrderService service;
	
	@Autowired Order order;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@PostMapping("/add") 
	public Order addOrder(@RequestBody Order order){
		
		logger.info("Order - Controller - Add Order");
		return this.service.addOrder(order);
	}
	
	@GetMapping()
	public List<Order> getOrders() {
		
		logger.info("Order - Controller - List Orders");
		return this.service.getOrders();
	}
	
	@PutMapping()
	public Order updateOrder(@PathVariable("id") Byte id, @RequestBody Order order) {
		
		logger.info("Order - Controller - Update Order ID: ");
		return this.service.updateOrder(id, order);
	}
	
	@DeleteMapping()
	public void deleteOrder(@PathVariable("id") Byte id) {
		
		logger.info("Order - Controller - Add Order");
		this.service.deleteOrder(id);
	}
	
}
