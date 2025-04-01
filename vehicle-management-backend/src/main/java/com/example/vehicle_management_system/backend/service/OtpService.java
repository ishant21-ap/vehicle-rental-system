package com.example.vehicle_management_system.backend.service;

public interface OtpService {

    String generateOtp(String email);
    boolean validateOtp(String email, String otp);
}
