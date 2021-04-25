import { ImageType } from "./ImageType";
import { ProductBrandType } from "./ProductBrandType";
import { ProductTypeType } from "./ProductTypeType";

export type ProductType = {
    id: number;
    title:string;
    description:string;
    cost:number;
    created_at:string;
    updated_at:string;
    productBrand: ProductBrandType,
    productType: ProductTypeType,
    images: ImageType[],
}