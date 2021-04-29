import { ImageType } from "./ImageType";

export type ProductBrandType = {
    id: number;
    brand_name:string;
    brand_description:string;
    images?: ImageType[],
}