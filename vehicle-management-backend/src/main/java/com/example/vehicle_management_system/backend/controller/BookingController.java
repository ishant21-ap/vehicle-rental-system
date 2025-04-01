package com.example.vehicle_management_system.backend.controller;

import com.example.vehicle_management_system.backend.entity.BookingStatus;
import com.example.vehicle_management_system.backend.payloads.BookingDto;
import com.example.vehicle_management_system.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;


    @PostMapping
    public ResponseEntity<BookingDto> createBooking(
            @RequestParam Long userId,
            @RequestParam Long vehicleId,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String name,
            @RequestParam String phoneNo) {
        BookingDto bookingDto = bookingService.createBooking(userId, vehicleId, LocalDate.parse(startDate), LocalDate.parse(endDate), name, phoneNo);
        return new ResponseEntity<>(bookingDto, HttpStatus.CREATED);

    }

    //Getting users booking history
    @GetMapping("/my")
    public List<BookingDto> getUserBookings(@RequestParam Long userId) {
        return bookingService.getUserBookings(userId);
    }

    //Getting Pending Booking for shopkeeper
    @GetMapping("/pending")
    public List<BookingDto> getPendingBookings(@RequestParam Long shopkeeperId) {
        return bookingService.getPendingBookingsForShopkeeper(shopkeeperId);
    }


    //Updating booking status (Coinfirm/Reject)
    @PutMapping("/{bookingId}/status")
    public ResponseEntity<BookingDto> confirmBooking(@PathVariable Long bookingId,
                                          @RequestParam Long shopkeeperId) {
        return ResponseEntity.ok(bookingService.confirmBooking(bookingId, shopkeeperId));
    }


    @PutMapping("/{bookingId}/complete")
    public ResponseEntity<BookingDto> completeBooking(@PathVariable Long bookingId
    ,@RequestParam Long shopkeeperId) {
        return ResponseEntity.ok(bookingService.completeBooking(bookingId, shopkeeperId));
    }


    @PostMapping("/cancel/{bookingId}/{userId}")
    public ResponseEntity<BookingDto> cancelBooking(@PathVariable Long bookingId,
                                                    @PathVariable Long userId) {
        return new ResponseEntity<>(bookingService.cancelBooking(bookingId, userId), HttpStatus.OK);

    }


}