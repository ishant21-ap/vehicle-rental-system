package com.example.vehicle_management_system.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "Name is required!")
    private String name;

    private String username;

    @Column(nullable = false, unique = true)
    @Email(message = "Please enter a valid email address!")
    private String email;

    @Column(nullable = false)
    @NotEmpty(message = "Password is required!")
//    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}", message = "Password must contain at least one number, one lowercase letter, and one uppercase letter, and be at least 6 characters long.")
    private String password;

    @Column(nullable = false, unique = true)
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Please enter a valid phone number (10-15 digits).")
    private String phone;

    private String address;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Role is required!")
    private Role role;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Status is required!")
    private Status status;

    // New common fields
    private LocalDate dob;

    private String profileImageUrl;

    @NotEmpty(message = "Gender is required!")
    private String gender;  // Example values: "Male", "Female", "Other"

    private LocalDateTime lastLogin;
    private boolean isLocked = false; // Default to false
    private boolean isVerified = false; // Default to false

    // Only for shopkeepers
    private String shopName;

    private String gstNumber;

    private String shopAddress;
    private String businessType; // Example values: "Retail", "Wholesale"

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private String otp;
    private LocalDateTime otpExpirationTime;

    @OneToMany(mappedBy = "shopkeeper", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vehicle> vehicles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Booking> userBookings; // Bookings made by the user

    @OneToMany(mappedBy = "shopkeeper", cascade = CascadeType.ALL)
    private List<Booking> shopkeeperBookings; // Bookings handled by the shopkeeper

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role.name()));
    }


    @Override
    public String getUsername() {
        return email;
    }
}
