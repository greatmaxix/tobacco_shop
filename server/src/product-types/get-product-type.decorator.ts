import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ProductTypes } from "./product-types.entity";

export const GetProductType = createParamDecorator((data, ctx: ExecutionContext): ProductTypes => {
    const req = ctx.switchToHttp().getRequest();
    return  req.body.productType;
});