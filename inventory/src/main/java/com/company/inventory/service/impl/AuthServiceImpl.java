package com.company.inventory.service.impl;

import com.company.inventory.dto.LoginRequestDTO;
import com.company.inventory.dto.LoginResponseDTO;
import com.company.inventory.entity.User;
import com.company.inventory.exception.ResourceNotFoundException;
import com.company.inventory.repository.UserRepository;
import com.company.inventory.service.AuthService;
import com.company.inventory.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResourceNotFoundException("Invalid username or password");
        }

        if (!user.getEnabled()) {
            throw new ResourceNotFoundException("User account is disabled");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        return new LoginResponseDTO(token);
    }
}
