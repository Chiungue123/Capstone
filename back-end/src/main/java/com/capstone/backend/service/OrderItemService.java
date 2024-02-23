package com.capstone.backend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.jpa.OrderItem;
import com.capstone.backend.repository.OrderItemRepository;

@Service
public class OrderItemService {
	
	@Autowired OrderItemRepository repo;
	
	@Autowired OrderItem orderItem;
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public OrderItem addOrderItem(OrderItem orderItem) {

		logger.info("OrderItem - Service - Add OrderItem");
		return this.repo.save(orderItem);
	}
	
	public List<OrderItem> getOrderItems() {

		logger.info("OrderItem - Service - List OrderItems");
		return this.repo.findAll();
	}
	
	public OrderItem updateOrderItem(Byte id, OrderItem orderItem) {

		logger.info("OrderItem - Service - Update OrderItem ID: ", id);
		
		return this.repo.findById(id).map(exsistingItem -> {
            exsistingItem.setId(orderItem.getId());
            exsistingItem.setOrder(orderItem.getOrder());
            exsistingItem.setMedicine(orderItem.getMedicine());
            exsistingItem.setQuantity(orderItem.getQuantity());
            exsistingItem.setCost(orderItem.getCost());
            
            return this.repo.save(exsistingItem);
            
        }).orElse(null);
	}
	
	public void deleteOrderItem(Byte id) {

		logger.info("OrderItem - Service - Add OrderItem");
		this.repo.deleteById(id);
	}

}
