package com.example.vehicle_management_system.backend.service.impl;

import com.example.vehicle_management_system.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    //Method to send specific mail
    @Override
    public void sendPendingRequestEmail(String to) {
        sendEmail(to, "Pending Request Notification",
                "You have a new pending request. Please review it in your dashboard.");
    }

    @Override
    public void sendConfirmationEmail(String to) {
        sendEmail(to, "Booking Confirmation",
                "Your booking has been successfully confirmed. Thank you for using our service!");
    }

    @Override
    public void sendBookingCancellationEmail(String to, String role) {
        String subject = "Booking Cancellation Notice";
        String body = role.equals("SHOPKEEPER") ?
                "A user has canceled a booking with your shop." :
                "The shopkeeper has rejected your booking request.";

        sendEmail(to, subject, body);
    }
}