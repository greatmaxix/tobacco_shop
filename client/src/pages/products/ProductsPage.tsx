import React from "react";
import { Card } from 'react-bootstrap'
import { inject } from 'mobx-react';
import ProductsService from "../../services/productsService";
import { ProductType } from "../../types/ProductType";
import * as base64ArrayBuffer from 'base64-arraybuffer';
import ImagesService from "../../services/imagesService";
type ProductsPageState = {
    products: ProductType[],
    service: ProductsService,
    imageService: ImagesService,
    images: any[],
}

@inject('userStore', 'routerStore', 'imagesStore')
export default class ProductsPage extends React.Component<any, ProductsPageState>{
    constructor(props: any) {
        super(props);
        this.state = {
            products: [],
            service: new ProductsService(this.props.routerStore),
            imageService: new ImagesService(this.props.routerStore),
            images: [],
        };
    }
    componentDidMount() {
        this.reload();
    }
    async reload() {
        let result = await this.state.service.fetchProducts({ title: null, product_types_id: null, product_brands_id: null });
        let products: ProductType[] = [];
        let productIds: number[] = [];
        let images: any[] = [];
        if (result && result.data && result.data.length > 0) {
            for (let i = 0; i < result.data.length; i++) {
                const element = result.data[i];
                productIds.push(element.id);
                products.push({
                    id: element.id,
                    title:element.title,
                    description: element.description,
                    cost: element.cost,
                    updated_at: element.updated_at,
                    created_at: element.created_at,
                    productBrand: element.productBrand,
                    productType: element.productType,
                    images: element.images,
                });
                
            }
        }
        let imagesResult = await this.state.imageService.fetchImages({
            "imageable_type": "products",
            "imageable_id": productIds
        });
        if (imagesResult && imagesResult.data && imagesResult.data.length > 0) {
            for (let i = 0; i < imagesResult.data.length; i++) {
                const element = imagesResult.data[i];
                images.push({
                    id: element.id,
                    alt_text: element.alt_text,
                    encoding: element.encoding,
                    imageable_id: element.imageable_id,
                    imageable_type: element.imageable_type,
                    originalname: element.originalname,
                    mimetype: element.mimetype,
                    image_blob: element.image_blob,
                });
                
            }
        }
        this.setState({
            products,
            images
        })
    }

    getProductsCard(): any[] {
        return this.state.products.map((product: ProductType, index) => {
            // const reader = new FileS();
            if (product.images && product.images[0])
                console.log(product.images[0].image_blob);
            // let other = btoa(String.fromCharCode.apply(null, product.images[0].image_blob.data!));
            let srt = this.state.images && this.state.images.length > 0 ? `data:${this.state.images[0].mimetype};base64,${Buffer.from(this.state.images[0].image_blob.data).toString('base64')}` : '';
            return <Card key={index}>
                <Card.Body>
                    <Card.Img variant="top" src={srt} />
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        {product.productBrand.brand_name}
                    </Card.Text>
                    <Card.Text>
                        {product.productType.type}
                    </Card.Text>
                </Card.Body>
            </Card>
        })
    }
    render() {
        return (
            <div>
                {this.getProductsCard()}
            </div>
        );
    }
}