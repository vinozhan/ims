package com.company.inventory.controller;

import com.company.inventory.dto.UserRequestDTO;
import com.company.inventory.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.company.inventory.dto.UserResponseDTO;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public void createUser(@RequestBody @Valid UserRequestDTO request) {
        userService.createUser(request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{userId}/toggle-status")
    public void toggleUserStatus(@PathVariable Long userId) {
        userService.toggleUserStatus(userId);
    }
}
