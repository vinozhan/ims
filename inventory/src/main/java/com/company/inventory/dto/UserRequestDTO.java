package com.company.inventory.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String role; // ADMIN or CASHIER
}
