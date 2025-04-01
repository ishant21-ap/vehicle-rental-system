package com.example.vehicle_management_system.backend.service;

import com.example.vehicle_management_system.backend.payloads.VehicleDto;

import java.util.List;

public interface VehicleService {

    public VehicleDto createVehicle(VehicleDto vehicleDto);
    public List<VehicleDto> getAllVehicles();
    public List<VehicleDto> getVehicleByShopkeeper();
    public VehicleDto updateVehicle(Long id, VehicleDto vehicleDto);
    public void deleteVehicle(Long id);
}
