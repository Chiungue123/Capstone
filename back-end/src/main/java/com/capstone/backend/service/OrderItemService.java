package com.capstone.backend.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.backend.jpa.Medicine;
import com.capstone.backend.jpa.Order;
import com.capstone.backend.jpa.OrderItem;
import com.capstone.backend.repository.MedicineRepository;
import com.capstone.backend.repository.OrderItemRepository;
import com.capstone.backend.repository.OrderRepository;

@Service
public class OrderItemService {
	
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MedicineRepository medicineRepository;
	
	@Transactional
    public List<OrderItem> addOrderItems(List<OrderItem> items) {
        for (OrderItem item : items) {
            Order order = orderRepository.findById(item.getId().getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found: " + item.getId().getOrderId()));
            Medicine medicine = medicineRepository.findById(item.getId().getMedicineId())
                    .orElseThrow(() -> new RuntimeException("Medicine not found: " + item.getId().getMedicineId()));
            
            item.setOrder(order);
            item.setMedicine(medicine);
        }
        return orderItemRepository.saveAll(items);
    }
	
	public List<OrderItem> getOrderItems() {

		logger.info("OrderItem - Service - List OrderItems");
		return this.orderItemRepository.findAll();
	}
	
	public List<OrderItem> getItemsByOrderId(Byte id) {

        logger.info("OrderItem - Service - Get OrderItems by Order ID: " + id);
        
        List<OrderItem> items = this.orderItemRepository.findById_OrderId(id);
        items.forEach(item -> logger.info(item.toString()));
        
        return items;
    }
	
	public OrderItem getOrderItem(Byte id) {

		logger.info("OrderItem - Service - Get OrderItem ID: " + id);
		return this.orderItemRepository.findById(id).orElse(null);
	}
	
	public void deleteOrderItems(List<OrderItem> items) {

		logger.info("OrderItem - Service - Add OrderItem");
		this.orderItemRepository.deleteAll(items);
	}
}