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

import com.capstone.backend.jpa.OrderItem;
import com.capstone.backend.service.OrderItemService;

@RestController
@RequestMapping("/order-items")
//@CrossOrigin(origins = "*")
public class OrderItemController {
	
	@Autowired OrderItemService service;
	
	@Autowired OrderItem orderItem;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@PostMapping("/add")
	public OrderItem addOrderItem(@RequestBody OrderItem orderItem) {

		logger.info("OrderItem - Controller - Add OrderItem");
		return this.service.addOrderItem(orderItem);
	}
	
	@GetMapping()
	public List<OrderItem> getOrderItems() {

		logger.info("OrderItem - Controller - List OrderItems");
		return this.service.getOrderItems();
	}
	
	@PutMapping("update/{id}")
	public OrderItem updateOrderItem(@PathVariable("id") Byte id, @RequestBody OrderItem orderItem) {

		logger.info("OrderItem - Controller - Update OrderItem ID: ");
		return this.service.updateOrderItem(id, orderItem);
	}
	
	@DeleteMapping("delete/{id}")
	public void deleteOrderItem(@PathVariable("id") Byte id) {

		logger.info("OrderItem - Controller - Add OrderItem");
		this.service.deleteOrderItem(id);
	}

}
