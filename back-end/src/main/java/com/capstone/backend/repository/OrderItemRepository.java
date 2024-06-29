package com.capstone.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.backend.jpa.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Byte> {

	public List<OrderItem> findById_OrderId(Byte orderId);
}
