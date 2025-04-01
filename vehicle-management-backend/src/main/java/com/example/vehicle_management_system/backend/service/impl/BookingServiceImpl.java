package com.example.vehicle_management_system.backend.service.impl;

import com.example.vehicle_management_system.backend.entity.Booking;
import com.example.vehicle_management_system.backend.entity.BookingStatus;
import com.example.vehicle_management_system.backend.entity.User;
import com.example.vehicle_management_system.backend.entity.Vehicle;
import com.example.vehicle_management_system.backend.exception.ResourceNotFoundException;
import com.example.vehicle_management_system.backend.payloads.BookingDto;
import com.example.vehicle_management_system.backend.repository.BookingRepository;
import com.example.vehicle_management_system.backend.repository.UserRepository;
import com.example.vehicle_management_system.backend.repository.VehicleRepository;
import com.example.vehicle_management_system.backend.service.BookingService;
import com.example.vehicle_management_system.backend.service.EmailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VehicleRepository vehicleRepository;


    @Override
    public BookingDto createBooking(Long userId, Long vehicleId, LocalDate startDate, LocalDate endDate,String name, String phoneNo) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId));
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle", "id", vehicleId));
        User shopkeeper = vehicle.getShopkeeper();

        double totalPrice = (endDate.toEpochDay() - startDate.toEpochDay()) * vehicle.getPrice();
        Booking booking = Booking.builder()
                .user(user)
                .vehicle(vehicle)
                .shopkeeper(shopkeeper)
                .status(BookingStatus.PENDING)
                .name(name)
                .phoneNo(phoneNo)
                .startDate(startDate)
                .endDate(endDate)
                .totalPrice(totalPrice)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        bookingRepository.save(booking);
        emailService.sendPendingRequestEmail(shopkeeper.getEmail());
        return modelMapper.map(booking, BookingDto.class);
    }

    @Override
    public List<BookingDto> getUserBookings(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream().map(b -> modelMapper.map(b, BookingDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<BookingDto> getPendingBookingsForShopkeeper(Long shopkeeperId) {
        List<Booking> bookings = bookingRepository.findByShopkeeperIdAndStatus(shopkeeperId, BookingStatus.PENDING);
        return bookings.stream().map(b -> modelMapper.map(b, BookingDto.class)).collect(Collectors.toList());
    }

    @Override
    public BookingDto confirmBooking(Long bookingId, Long shopkeeperId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if(!booking.getShopkeeper().getId().equals(shopkeeperId)) {
            throw new RuntimeException("Unauthorized access to update this booking !");
        }
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setUpdatedAt(LocalDateTime.now());
        bookingRepository.save(booking);
        emailService.sendConfirmationEmail(booking.getUser().getEmail());
        return modelMapper.map(booking, BookingDto.class);
    }

    @Override
    public BookingDto completeBooking(Long bookingId, Long shopkeeperId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if(!booking.getShopkeeper().getId().equals(shopkeeperId)) {
            throw new RuntimeException("Unauthorized access to update this booking !");
        }
        booking.setStatus(BookingStatus.COMPLETED);
        booking.setUpdatedAt(LocalDateTime.now());
        bookingRepository.save(booking);
        return modelMapper.map(booking, BookingDto.class);
    }

    @Override
    public BookingDto cancelBooking(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (!booking.getUser().getId().equals(userId) && !booking.getShopkeeper().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to cancel this booking!");
        }


        if(booking.getUser().getId().equals(userId)) {
            booking.setStatus(BookingStatus.CANCELED_BY_USER);
            emailService.sendBookingCancellationEmail(booking.getUser().getEmail(), "USER");
        }

        else if(booking.getShopkeeper().getId().equals(userId)) {
            booking.setStatus(BookingStatus.CANCELED_BY_SHOPKEEPER);
            emailService.sendBookingCancellationEmail(booking.getShopkeeper().getEmail(), "SHOPKEEPER");
        }

        bookingRepository.save(booking);
        return modelMapper.map(booking, BookingDto.class);
    }


}
