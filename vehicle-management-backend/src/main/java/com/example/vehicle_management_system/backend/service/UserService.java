package com.example.vehicle_management_system.backend.service;

import com.example.vehicle_management_system.backend.entity.User;
import com.example.vehicle_management_system.backend.payloads.ApiResponse;
import com.example.vehicle_management_system.backend.payloads.UserDto;


public interface UserService {

    ApiResponse registerUser(UserDto userDto);
    UserDto getUserByEmail(String email);
    UserDto updateUser(Long id, UserDto userDto);
    boolean verfiyOtp(String email, String otp);

}
