import { EntityRepository, Repository } from "typeorm";
import { Invoices } from "src/invoices/invoices.entity";

@EntityRepository(Invoices)
export class InvoicesRepository extends Repository<Invoices> {
}