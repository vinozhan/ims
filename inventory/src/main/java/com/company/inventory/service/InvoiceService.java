package com.company.inventory.service;

import com.company.inventory.dto.InvoiceRequestDTO;
import com.company.inventory.dto.InvoiceResponseDTO;

public interface InvoiceService {

    //void createInvoice(InvoiceRequestDTO request);
    InvoiceResponseDTO createInvoice(InvoiceRequestDTO request);

}
