import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Invoices } from 'src/invoices/invoices.entity';
import { InvoicesService } from 'src/invoices/invoices.service';
import { CreateInvoiceDto } from 'src/invoices/dto/create-invoice.dto';
import { GetInvoicesFilterDto } from 'src/invoices/dto/get-invoices-filter.dto';

@Controller('invoices')
export class InvoicesController {
    constructor(private invoicesService: InvoicesService) {};

    @Get()
    getInvoices(
        filterDto: GetInvoicesFilterDto,
    ) : Promise<Invoices[]> {
        return this.invoicesService.getInvoices(filterDto);
    }

    @Post()
    createInvoice(
        @Body() createInvoiceDto: CreateInvoiceDto,
    ) : Promise<Invoices> {
        return this.invoicesService.createInvoice(createInvoiceDto);
    }

    @Delete('/:id')
    deleteInvoice(
        @Param('id', ParseIntPipe) id: number,
    ) : Promise<void> {
        return this.invoicesService.deleteInvoice(id);
    }

    @Patch('/:id')
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() createInvoiceDto: CreateInvoiceDto,
    ) : Promise<Invoices> {
        return this.invoicesService.updateInvoice(id, createInvoiceDto);
    }
}
