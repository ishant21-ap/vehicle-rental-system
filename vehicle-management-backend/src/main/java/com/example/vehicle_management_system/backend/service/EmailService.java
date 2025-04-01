package com.example.vehicle_management_system.backend.service;

public interface EmailService {
    void sendEmail(String to, String subject, String body);
    void sendPendingRequestEmail(String to);
    void sendConfirmationEmail(String to);
    void sendBookingCancellationEmail(String to, String role);
}
