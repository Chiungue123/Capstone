package com.capstone.backend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.backend.jpa.OrderItem;
import com.capstone.backend.service.OrderItemService;

@RestController
@RequestMapping("/order-items")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderItemController {
	
	@Autowired OrderItemService service;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@PostMapping("/add")
	public List<OrderItem> addOrderItems(@RequestBody List<OrderItem> items) {

		logger.info("OrderItem - Controller - Add OrderItems: " + items.toString());
		return this.service.addOrderItems(items);
	}
	
	@GetMapping("/order/{id}")
	public List<OrderItem> getOrderItemsByOrderId(@PathVariable Byte id) {

		logger.info("OrderItem - Controller - Get OrderItems by Order ID: " + id);
		return this.service.getItemsByOrderId(id);
	}
	
	@GetMapping()
	public List<OrderItem> getOrderItems() {

		logger.info("OrderItem - Controller - List OrderItems");
		return this.service.getOrderItems();
	}
	
	
	@DeleteMapping("/delete")
	public void deleteOrderItems(@RequestBody List<OrderItem> items) {

		logger.info("OrderItem - Controller - Delete OrderItems: " + items);
		this.service.deleteOrderItems(items);
	}
}