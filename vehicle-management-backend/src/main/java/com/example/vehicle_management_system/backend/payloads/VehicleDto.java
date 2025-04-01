package com.example.vehicle_management_system.backend.payloads;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VehicleDto {

    private Long id;
    private String name;
    private String brand;
    private String model;
    private Double price;
    private String description;
    private String category;
    private List<String> imageUrls;
}
