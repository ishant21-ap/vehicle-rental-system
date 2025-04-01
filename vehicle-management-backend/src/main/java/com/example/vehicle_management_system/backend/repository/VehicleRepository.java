package com.example.vehicle_management_system.backend.repository;

import com.example.vehicle_management_system.backend.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByShopkeeperId(Long shopkeeperId);
}
