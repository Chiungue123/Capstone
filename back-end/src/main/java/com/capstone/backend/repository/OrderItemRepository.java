package com.capstone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.backend.jpa.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Byte> {

}
