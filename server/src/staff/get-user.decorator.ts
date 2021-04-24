import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Staff } from "src/staff/staff.entity";

export const GetStaff = createParamDecorator((data, ctx: ExecutionContext): Staff => {
    const req = ctx.switchToHttp().getRequest();
    return req.staff;
});