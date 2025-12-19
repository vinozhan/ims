package com.company.inventory.service.impl;

import com.company.inventory.dto.InvoiceRequestDTO;
import com.company.inventory.dto.InvoiceResponseDTO;
import com.company.inventory.entity.Invoice;
import com.company.inventory.entity.InvoiceItem;
import com.company.inventory.entity.Product;
import com.company.inventory.exception.ResourceNotFoundException;
import com.company.inventory.repository.InvoiceRepository;
import com.company.inventory.repository.ProductRepository;
import com.company.inventory.service.InvoiceService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final ProductRepository productRepository;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository,
            ProductRepository productRepository) {
        this.invoiceRepository = invoiceRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public InvoiceResponseDTO createInvoice(InvoiceRequestDTO request) {

        Invoice invoice = new Invoice();
        invoice.setInvoiceNumber("INV-" + UUID.randomUUID());
        invoice.setInvoiceDate(LocalDateTime.now());

        List<InvoiceItem> items = new ArrayList<>();
        double totalAmount = 0.0;

        for (InvoiceRequestDTO.InvoiceItemRequestDTO itemReq : request.getItems()) {

            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Product not found with id " + itemReq.getProductId()));

            double unitPrice = product.getPrice();
            double lineTotal = unitPrice * itemReq.getQuantity();

            InvoiceItem item = new InvoiceItem();
            item.setInvoice(invoice);
            item.setProduct(product);
            item.setQuantity(itemReq.getQuantity());
            item.setUnitPrice(unitPrice);
            item.setLineTotal(lineTotal);

            items.add(item);
            totalAmount += lineTotal;
        }

        invoice.setItems(items);
        invoice.setTotalAmount(totalAmount);

        Invoice saved = invoiceRepository.save(invoice); // 🔥 cascades to items

        return new InvoiceResponseDTO(
                saved.getInvoiceNumber(),
                saved.getInvoiceDate(),
                saved.getTotalAmount());
    }
}
