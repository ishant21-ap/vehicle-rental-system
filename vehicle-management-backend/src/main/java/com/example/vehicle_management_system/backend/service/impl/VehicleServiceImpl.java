package com.example.vehicle_management_system.backend.service.impl;

import com.example.vehicle_management_system.backend.entity.Vehicle;
import com.example.vehicle_management_system.backend.exception.ResourceNotFoundException;
import com.example.vehicle_management_system.backend.payloads.VehicleDto;
import com.example.vehicle_management_system.backend.repository.UserRepository;
import com.example.vehicle_management_system.backend.repository.VehicleRepository;
import com.example.vehicle_management_system.backend.service.VehicleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public VehicleDto createVehicle(VehicleDto vehicleDto) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByEmail(currentUsername)
                .orElseThrow(()-> new ResourceNotFoundException("User", "email", currentUsername));

        if(!"Shopkeeper".equalsIgnoreCase(String.valueOf(user.getRole()))){
            throw new SecurityException("Only Shopkeepers can create vehicles");
        }

        Vehicle vehicle = modelMapper.map(vehicleDto, Vehicle.class);
        vehicle.setShopkeeper(user);
        vehicle = vehicleRepository.save(vehicle);
        return modelMapper.map(vehicle, VehicleDto.class);
    }



    @Override
    public List<VehicleDto> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(vehicle -> modelMapper.map(vehicle, VehicleDto.class))
                .collect(Collectors.toList());
    }


    @Override
    public List<VehicleDto> getVehicleByShopkeeper() {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByEmail(currentUsername)
                .orElseThrow(()-> new ResourceNotFoundException("User", "email", currentUsername));
        if(!"Shopkeeper".equalsIgnoreCase(String.valueOf(user.getRole()))) {
            throw new SecurityException("Only Shopkeepers can view there vehicles");
        }
        return vehicleRepository.findByShopkeeperId(user.getId()).stream()
                .map(vehicle -> modelMapper.map(vehicle, VehicleDto.class)).collect(Collectors.toList());
    }



    @Override
    public VehicleDto updateVehicle(Long id, VehicleDto vehicleDto) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Vehicle", "id", id));

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByEmail(currentUsername)
                .orElseThrow(()-> new ResourceNotFoundException("User", "email", currentUsername));

        if(!user.getId().equals(vehicle.getShopkeeper().getId())) {
            throw new SecurityException("Only Shopkeepers can update vehicles");
        }
        modelMapper.map(vehicleDto, vehicle);
        vehicle = vehicleRepository.save(vehicle);
        return modelMapper.map(vehicle, VehicleDto.class);
    }



    @Override
    public void deleteVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Vehicle", "id", id));

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByEmail(currentUsername)
                .orElseThrow(()-> new ResourceNotFoundException("User", "email", currentUsername));

        if(!user.equals(vehicle.getShopkeeper())) {
            throw new SecurityException("Only Shopkeepers can delete vehicles");
        }
        vehicleRepository.delete(vehicle);
    }
}
