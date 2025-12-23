package com.company.inventory.service;

import com.company.inventory.dto.LoginRequestDTO;
import com.company.inventory.dto.LoginResponseDTO;

public interface AuthService {
    LoginResponseDTO login(LoginRequestDTO request);
}
