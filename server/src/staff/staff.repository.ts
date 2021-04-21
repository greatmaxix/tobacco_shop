import { EntityRepository, Repository } from "typeorm";
import { Staff } from "src/staff/staff.entity";

@EntityRepository(Staff)
export class StaffRepository extends Repository<Staff> {
}