package com.springJWT.auth_api.repositories;

import com.springJWT.auth_api.dtos.OrderDto;
import com.springJWT.auth_api.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(int id);

    @Query(value = "SELECT * FROM orders ORDER BY createtimestamp DESC LIMIT 20", nativeQuery = true)
    List<Order> findLast20Orders();

    boolean existsByUserId(int id);


}



