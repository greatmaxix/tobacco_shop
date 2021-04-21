import { EntityRepository, Repository } from "typeorm";
import { StaffMobiles } from "src/staff-mobiles/staff-mobiles.entity";

@EntityRepository(StaffMobiles)
export class StaffMobilesRepository extends Repository<StaffMobiles> {
}