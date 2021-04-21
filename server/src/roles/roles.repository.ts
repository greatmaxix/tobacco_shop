import { EntityRepository, Repository } from "typeorm";
import { Roles } from "src/roles/roles.entity";

@EntityRepository(Roles)
export class RolesRepository extends Repository<Roles> {
}