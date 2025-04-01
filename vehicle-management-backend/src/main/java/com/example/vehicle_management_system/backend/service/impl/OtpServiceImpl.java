package com.example.vehicle_management_system.backend.service.impl;

import com.example.vehicle_management_system.backend.entity.User;
import com.example.vehicle_management_system.backend.repository.UserRepository;
import com.example.vehicle_management_system.backend.service.EmailService;
import com.example.vehicle_management_system.backend.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class OtpServiceImpl implements OtpService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;


    @Override
    public String generateOtp(String email) {

        //Generate 6 digit otp
        SecureRandom random = new SecureRandom();
        String otp = String.format("%06d", random.nextInt(999999));

        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            user.setOtp(otp);
            user.setOtpExpirationTime(LocalDateTime.now().plusDays(5)); //otp expires in 5 minutes
            userRepository.save(user);

            emailService.sendEmail(user.getEmail(), "Your Otp for email verification is : ", otp);
        }
        return otp;
    }



    @Override
    public boolean validateOtp(String email, String otp) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user != null) {
            if(user.getOtp().equals(otp) && LocalDateTime.now().isBefore(user.getOtpExpirationTime())) {
                return true;
            }
        }
        return false;
    }
}
