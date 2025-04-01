package com.example.vehicle_management_system.backend.repository;

import com.example.vehicle_management_system.backend.entity.Booking;
import com.example.vehicle_management_system.backend.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);
    List<Booking> findByShopkeeperIdAndStatus(Long shopkeeperId, BookingStatus status);
}
