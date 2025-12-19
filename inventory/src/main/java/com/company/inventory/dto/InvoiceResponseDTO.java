package com.company.inventory.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceResponseDTO {
    private String invoiceNumber;
    private LocalDateTime invoiceDate;
    private Double totalAmount;
}
