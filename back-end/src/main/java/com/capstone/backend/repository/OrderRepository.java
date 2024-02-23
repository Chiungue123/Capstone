package com.capstone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.backend.jpa.Order;

public interface OrderRepository extends JpaRepository<Order, Byte>{

}
