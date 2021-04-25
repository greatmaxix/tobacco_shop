export type ImageType = {
    id: number;
    alt_text:string;
    imageable_id:number;
    imageable_type: ImageableType;
    image_blob: any,
    mimetype: string,
    originalname: string,
    encoding: string,
}

export enum ImageableType {
    'products' = 'products',
}

// type ImageBufferData = {
//     type: 'string',
//     data: Buffer
// }