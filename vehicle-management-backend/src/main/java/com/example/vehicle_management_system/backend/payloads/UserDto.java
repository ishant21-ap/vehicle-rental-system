package com.example.vehicle_management_system.backend.payloads;

import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String name;
    private String email;
    private String username;
    private String phone;
    private String password;
    private String address;
    private String role;

    private String dob;
    private String profileImageUrl;
    private String gender;


    // Only for shopkeeper
    private String shopName;
    private String gstNumber;
    private String shopAddress;
    private String businessType;
}
