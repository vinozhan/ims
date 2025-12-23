package com.company.inventory.controller;

import com.company.inventory.dto.LoginRequestDTO;
import com.company.inventory.dto.LoginResponseDTO;
import com.company.inventory.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody @Valid LoginRequestDTO request) {
        return authService.login(request);
    }
}
