import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { Invoices } from 'src/invoices/invoices.entity';
import { InvoicesService } from 'src/invoices/invoices.service';
import { CreateInvoiceDto } from 'src/invoices/dto/create-invoice.dto';
import { GetInvoicesFilterDto } from 'src/invoices/dto/get-invoices-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetStaff } from 'src/staff/get-user.decorator';
import { Staff } from 'src/staff/staff.entity';

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
    @UseGuards(AuthGuard())
    createInvoice(
        @Body() createInvoiceDto: CreateInvoiceDto,
        @GetStaff() staff: Staff,
    ) : Promise<Invoices> {
        return this.invoicesService.createInvoice(createInvoiceDto, staff);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteInvoice(
        @Param('id', ParseIntPipe) id: number,
        @GetStaff() staff: Staff,
    ) : Promise<void> {
        return this.invoicesService.deleteInvoice(id, staff);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard())
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() createInvoiceDto: CreateInvoiceDto,
        @GetStaff() staff: Staff,
    ) : Promise<Invoices> {
        return this.invoicesService.updateInvoice(id, createInvoiceDto, staff);
    }
}
