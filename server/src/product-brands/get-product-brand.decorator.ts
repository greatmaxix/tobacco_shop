import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ProductBrands } from "./product-brands.entity";

export const GetProductBrand = createParamDecorator((data, ctx: ExecutionContext): ProductBrands => {
    const req = ctx.switchToHttp().getRequest();
    return req.body.productBrand;
});