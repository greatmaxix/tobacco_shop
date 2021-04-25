import React from "react";
import { Card, Carousel } from 'react-bootstrap'
import { inject } from 'mobx-react';
import ProductsService from "../../services/productsService";
import { ProductType } from "../../types/ProductType";
import * as base64ArrayBuffer from 'base64-arraybuffer';
import ImagesService from "../../services/imagesService";
import { ImageType } from "../../types/ImageType";
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
        // let images: any[] = [];
        if (result && result.data && result.data.length > 0) {
            for (let i = 0; i < result.data.length; i++) {
                const element = result.data[i];
                let imagesResult =  await this.state.imageService.fetchImages({
                    "imageable_type": "products",
                    "imageable_id": element.id
                });
                products.push({
                    id: element.id,
                    title: element.title,
                    description: element.description,
                    cost: element.cost,
                    updated_at: element.updated_at,
                    created_at: element.created_at,
                    productBrand: element.productBrand,
                    productType: element.productType,
                    images: imagesResult && imagesResult.data && imagesResult.data.length > 0 ? imagesResult.data : [],
                });

            }
        }
        this.setState({
            products
        })
    }

    getProductsCarousel(product: ProductType) {
        return (
            <Carousel>
                {product.images.map((image: ImageType, index) => {
                    let src = image && image.mimetype &&  image.image_blob && image.image_blob.data ? `data:${image.mimetype};base64,${Buffer.from(image.image_blob.data).toString('base64')}` : '';
                    return <Carousel.Item>
                        <img
                            className="d-block img-thumbnail"
                            src={src}
                            alt={image.alt_text}
                        />
                        <Carousel.Caption>
                            <h3>{product.cost + " тг"}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                })}
            </Carousel>
        )
    }

    getProductsCard(): any[] {
        return this.state.products.map((product: ProductType, index) => {
            return <Card key={index} style={{width: '600px'}}>
                <Card.Body>
                    {this.getProductsCarousel(product)}
                </Card.Body>
                <Card.Footer className="text-center">
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        {product.productBrand.brand_name}
                    </Card.Text>
                    <Card.Text>
                        {product.productType.type}
                    </Card.Text>
                </Card.Footer>
            </Card>
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="d-flex flex-wrap align-items-center justify-content-center">
                    {this.getProductsCard()}
                </div>
            </div>
        );
    }
}