package com.springJWT.auth_api.repositories;

import com.springJWT.auth_api.controllers.models.Status;
import com.springJWT.auth_api.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(int id);

    @Query(value = "SELECT * FROM orders ORDER BY createtimestamp DESC LIMIT 20", nativeQuery = true)
    List<Order> findLast20Orders();

    boolean existsByUserId(int id);

    List<Order> findByUserIdAndStatus(int userId, Status status);
}





