package com.example.vehicle_management_system.backend.service.impl;

import com.example.vehicle_management_system.backend.entity.Role;
import com.example.vehicle_management_system.backend.entity.Status;
import com.example.vehicle_management_system.backend.entity.User;
import com.example.vehicle_management_system.backend.exception.ResourceNotFoundException;
import com.example.vehicle_management_system.backend.payloads.ApiResponse;
import com.example.vehicle_management_system.backend.payloads.UserDto;
import com.example.vehicle_management_system.backend.repository.UserRepository;
import com.example.vehicle_management_system.backend.service.OtpService;
import com.example.vehicle_management_system.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OtpService otpService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ApiResponse registerUser(UserDto userDto) {
        log.info("Attempting to register user with email: {}", userDto.getEmail());

        if (userRepository.existsByEmail(userDto.getEmail())) {
            log.warn("Email already in use: {}", userDto.getEmail());
            return new ApiResponse("Email already in use!", false);
        }

        User user = modelMapper.map(userDto, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.valueOf(userDto.getRole().toUpperCase()));
        user.setStatus(Status.INACTIVE);
        user.setLocked(false);
        user.setVerified(false);

        if (Role.SHOPKEEPER.name().equalsIgnoreCase(userDto.getRole())) {
            if (userDto.getShopName() == null || userDto.getGstNumber() == null) {
                return new ApiResponse("Shop Name and GST Number are required for Shopkeeper!", false);
            }
            user.setShopName(userDto.getShopName());
            user.setGstNumber(userDto.getGstNumber());
        }

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        otpService.generateOtp(userDto.getEmail());
        log.info("User registered successfully with email: {}", userDto.getEmail());
        return new ApiResponse("Registration Successful. OTP sent to your email!", true);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return modelMapper.map(user, UserDto.class);
    }


    @Override
    @Transactional
    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "ID", id));

        if (userDto.getEmail() != null) user.setEmail(userDto.getEmail());
        if (userDto.getRole() != null) user.setRole(Role.valueOf(userDto.getRole().toUpperCase()));
        if (userDto.getShopName() != null) user.setShopName(userDto.getShopName());
        if (userDto.getGstNumber() != null) user.setGstNumber(userDto.getGstNumber());
        if (userDto.getPassword() != null) user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        userRepository.save(user);
        return modelMapper.map(user, UserDto.class);
    }


    @Override
    public boolean verfiyOtp(String email, String otp) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        boolean isOtpValid = otpService.validateOtp(email, otp);
        if (isOtpValid) {
            user.setStatus(Status.ACTIVE);
            user.setVerified(true);
            userRepository.save(user);
            return true;
        }

        return false;
    }
}
