import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/staff/staff.entity';
import { CreateInvoiceDto } from 'src/invoices/dto/create-invoice.dto';
import { GetInvoicesFilterDto } from 'src/invoices/dto/get-invoices-filter.dto';
import { Invoices } from 'src/invoices/invoices.entity';
import { InvoicesRepository } from 'src/invoices/invoices.repository';

@Injectable()
export class InvoicesService {
    constructor(
        @InjectRepository(InvoicesRepository)
        private invoicesRepository: InvoicesRepository
    ) {}

    async getInvoices(filterDto: GetInvoicesFilterDto) : Promise<Invoices[]> {
        return this.invoicesRepository.getInvoices(filterDto);
    }

    async getInvoiceById(id: number) : Promise<Invoices> {
        let found = await this.invoicesRepository.findOne({
            where: {
                id,
            }
        });

        if (!found) {
            throw new NotFoundException(`Product type with id "${id}" not found`);
        }
        return found;
    }

    async createInvoice(createInvoiceDto: CreateInvoiceDto, staff: Staff) : Promise<Invoices> {
        return this.invoicesRepository.createInvoice(createInvoiceDto, staff);
    }

    async deleteInvoice(id: number, staff: Staff) : Promise<void> {
        const { raw, affected }  = await this.invoicesRepository.delete({
            id,
        });

        if (affected === 0) {
            throw new NotFoundException(`Product type with id "${id}" not found`);
        }
    }
    async updateInvoice(id: number, createInvoiceDto: CreateInvoiceDto, staff: Staff) : Promise<Invoices> {
        return this.invoicesRepository.updateInvoice(id, createInvoiceDto, staff);
    }
}
