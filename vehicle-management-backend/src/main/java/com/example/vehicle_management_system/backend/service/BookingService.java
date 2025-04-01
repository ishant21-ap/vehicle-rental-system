package com.example.vehicle_management_system.backend.service;

import com.example.vehicle_management_system.backend.entity.BookingStatus;
import com.example.vehicle_management_system.backend.payloads.BookingDto;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    BookingDto createBooking(Long userId, Long vehicleId, LocalDate startDate, LocalDate endDate, String name, String phoneNo);
    List<BookingDto> getUserBookings(Long userId);
    List<BookingDto> getPendingBookingsForShopkeeper(Long shopkeeperId);
    BookingDto confirmBooking(Long bookingId, Long shopkeeperId);
    BookingDto completeBooking(Long bookingId, Long shopkeeperId);
    BookingDto cancelBooking(Long bookingId, Long userId);

}
