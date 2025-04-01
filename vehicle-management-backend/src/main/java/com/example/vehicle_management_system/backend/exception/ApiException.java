package com.example.vehicle_management_system.backend.exception;

public class ApiException extends RuntimeException {

    public ApiException(String message) {
        super(message);
    }

    public ApiException(){
        super();
    }
}
