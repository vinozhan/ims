package com.company.inventory.service;

import java.util.List;

import com.company.inventory.dto.UserRequestDTO;
import com.company.inventory.dto.UserResponseDTO;

public interface UserService {
    void createUser(UserRequestDTO request);
    List<UserResponseDTO> getAllUsers();
    void toggleUserStatus(Long userId);
}
