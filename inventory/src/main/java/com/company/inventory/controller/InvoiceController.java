package com.company.inventory.controller;

import com.company.inventory.dto.InvoiceRequestDTO;
import com.company.inventory.dto.InvoiceResponseDTO;
import com.company.inventory.service.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','CASHIER')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InvoiceResponseDTO createInvoice(@RequestBody @Valid InvoiceRequestDTO request) {
        return invoiceService.createInvoice(request);
    }
}
