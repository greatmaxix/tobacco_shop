import React from "react";
import { inject } from 'mobx-react';
import { ProductType } from "../../types/ProductType";
import ImagesStore from "../../stores/ImagesStore";
import ProductStore from "../../stores/ProductStore";
import ProductsService from "../../services/productsService";
import { RouterStore } from "mobx-react-router";
import { Card,Carousel} from 'react-bootstrap';
import blankProduct from '../../assets/blankProduct.jpg';
import ImagesService from "../../services/imagesService";
import { ImageType } from "../../types/ImageType";





type ProductsViewPageState = {
    product: ProductType | null,
    service: ProductsService,
    imageService: ImagesService,
    images: any[],
}

type ProductsViewPageProps = {
    imagesStore: ImagesStore,
    productsStore: ProductStore,
    match: {
        params: {
            id: number;
        }
    },
    history: any,
    routerStore: RouterStore
}


@inject('userStore', 'routerStore', 'imagesStore', 'productsStore')
export default class ProductsViewPage extends React.Component<ProductsViewPageProps, ProductsViewPageState>{
    constructor(props: any) {
        super(props);
        this.state = {
            product: null,
            service: new ProductsService(this.props.routerStore),
            imageService: new ImagesService(this.props.routerStore),
            images: []
        };
    }
    componentDidMount() {
        this.reload();
    }

    async reload() {
        console.log(this.props);
        let product = null;
        let result = await this.state.service.getProduct(this.props.match.params.id);
        if (result && result.data) {
            let imagesResult = await this.state.imageService.fetchImages({
                "imageable_type": "products",
                "imageable_id": result.data.id
            });
            product = result.data;
            product.images = imagesResult && imagesResult.data && imagesResult.data.length > 0 ? imagesResult.data : [];
            this.setState({
                product: product
            })
        }
        console.log(this.state.product)
        let productType = await this.state.service.getProductType(this.props.match.params.id);
        console.log(productType)
    }   
    getProductsCarousel(product: ProductType | null) {
        return (
            <Carousel>
                {product && product.images.length > 0  ? product.images.map((image: ImageType, index) => {
                    let src = image && image.mimetype && image.image_blob && image.image_blob.data ? `data:${image.mimetype};base64,${Buffer.from(image.image_blob.data).toString('base64')}` : '';
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
                }) : <Carousel.Item>
                    <img
                        className="d-block img-thumbnail"
                        src={blankProduct}
                        alt={product?.title}

                    />
                    <Carousel.Caption>
                        <h3>{product?.cost + " тг"}</h3>
                    </Carousel.Caption>
                </Carousel.Item>}
            </Carousel>
        )
    }

    render() {
        return (
            <div className="container-fluid text-center">
            <Card>
            <Card.Body>
                {this.getProductsCarousel(this.state.product)}
            </Card.Body>
            <Card.Footer className="text-center">
                <Card.Title>{this.state.product?.title}</Card.Title>
                <Card.Text>
                    {this.state.product?.description}
                </Card.Text>
            </Card.Footer>
        </Card>
        </div>
        );
    }
}