import { EntityRepository, Repository } from "typeorm";
import { Invoices } from "src/invoices/invoices.entity";
import { GetInvoicesFilterDto } from "src/invoices/dto/get-invoices-filter.dto";
import { CreateInvoiceDto } from "src/invoices/dto/create-invoice.dto";
import { Staff } from "src/staff/staff.entity";

@EntityRepository(Invoices)
export class InvoicesRepository extends Repository<Invoices> {
    async getInvoices(filterDto: GetInvoicesFilterDto) : Promise<Invoices[]> {
        const { ids, created_at } = filterDto;
        const query = this.createQueryBuilder('invoices');

        if (ids) {
            query.andWhereInIds(ids);
        }

        if (created_at) {
            query.andWhere('invoices.created_at = :created_at', { created_at });
        }
        
        const invoices = await query.getMany();
        return invoices;
    }

    async createInvoice(createInvoiceDto: CreateInvoiceDto, staff: Staff) : Promise<Invoices> {
        const { products } = createInvoiceDto;
        const invoice = new Invoices();
        invoice.products = products;
        invoice.staff = staff;
        await invoice.save();

        return invoice;
    }

    async updateInvoice(id: number, createInvoiceDto: CreateInvoiceDto, staff: Staff) : Promise<Invoices> {
        const { products } = createInvoiceDto;
        const invoice = new Invoices();
        invoice.products = products;
        invoice.staff = staff;
        await invoice.save();
        return invoice;
    }
}