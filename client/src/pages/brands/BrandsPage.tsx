import React from "react";
import { Accordion, Button, Card, Carousel, Form, Table } from 'react-bootstrap'
import { inject } from 'mobx-react';
import ProductsService from "../../services/productsService";
import { ProductType } from "../../types/ProductType";
import ImagesService from "../../services/imagesService";
import { ImageType } from "../../types/ImageType";
import { Link } from "react-router-dom";
import blankProduct from '../../assets/blankProduct.jpg';
import { ProductBrandType } from "../../types/ProductBrandType";
import { ProductTypeType } from "../../types/ProductTypeType";

type BrandsPageState = {
    brands: ProductBrandType[],
    service: ProductsService,
    imageService: ImagesService,
    images: any[],
    newTitle: string,
    newDescription: string,
    newImage: any,
    uploadedFile: any,
}

@inject('userStore', 'routerStore', 'imagesStore')
export default class BrandsPage extends React.Component<any, BrandsPageState>{
    constructor(props: any) {
        super(props);
        this.state = {
            brands: [],
            service: new ProductsService(this.props.routerStore),
            imageService: new ImagesService(this.props.routerStore),
            images: [],
            newTitle: '',
            newDescription: '',
            newImage: null,
            uploadedFile: null,
        };
    }
    private reader = new FileReader();

    componentDidMount() {
        this.reload();
    }
    async reload() {
        let result = await this.state.service.fetchProductBrands({ title: null, product_types_id: null, product_brands_id: null });
        let brands: ProductBrandType[] = [];
        if (result && result.data && result.data.length > 0) {
            for (let i = 0; i < result.data.length; i++) {
                const element = result.data[i];
                let imagesResult = await this.state.imageService.fetchImages({
                    "imageable_type": "product_brands",
                    "imageable_id": element.id
                });
                brands.push({
                    id: element.id,
                    brand_name: element.brand_name,
                    brand_description: element.brand_description,
                    images: imagesResult && imagesResult.data && imagesResult.data.length > 0 ? imagesResult.data : [],
                });

            }
        }
        this.setState({
            brands
        })
    }

    async createProduct() {
        if (!this.state.newTitle || !this.state.newDescription) {
            //todo show error message on toast!
            return
        }
        let createdNewFile = await this.state.service.createBrand({
            brand_name: this.state.newTitle,
            brand_description: this.state.newDescription,
        });
        
        if (createdNewFile && createdNewFile.data && createdNewFile.data.id && this.state.uploadedFile && this.state.uploadedFile && this.state.uploadedFile.length > 0) {
            let formData = new FormData();
            formData.append("imageable_type", 'product_brands');
            formData.append("imageable_id", createdNewFile.data.id);
            formData.append("alt_text", 'createdNewFile.data.id');
            formData.append("image_blob", this.state.uploadedFile[0]);

            let createdNewImage = await this.state.imageService.uploadImage(formData);
        }

        await this.reload();
    }

    handleFiles(e: any) {
        this.setState({ uploadedFile: e.target.files });
        if (e.target.files && e.target.files.length) {
            this.reader.readAsDataURL(e.target.files[0]);
        }
    }

    getProductsCarousel(brand: ProductBrandType) {
        return (
            <Carousel>
                {brand.images && brand.images.length > 0 ? brand.images.map((image: ImageType, index) => {
                    let src = image && image.mimetype && image.image_blob && image.image_blob.data ? `data:${image.mimetype};base64,${Buffer.from(image.image_blob.data).toString('base64')}` : '';
                    return <Carousel.Item key={index}>
                        <img
                            className="d-block img-thumbnail"
                            src={src}
                            alt={image.alt_text}
                        />
                        <Carousel.Caption>
                            {/* <h3>{brand.brand_name }</h3> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                }) : <Carousel.Item>
                    <img
                        className="d-block img-thumbnail"
                        src={blankProduct}
                        alt={brand.brand_name}
                    />
                    <Carousel.Caption>
                        {/* <h3>{product.cost + " тг"}</h3> */}
                    </Carousel.Caption>
                </Carousel.Item>}
            </Carousel>
        )
    }

    getProductsCard(): any[] {
        return this.state.brands.map((brand: ProductBrandType, index) => {
            return <Card key={index} style={{ width: '600px' }}>
                <Card.Body>
                    {this.getProductsCarousel(brand)}
                </Card.Body>
                <Card.Footer className="text-center">
                    <Card.Title>{brand.brand_name}</Card.Title>
                    <Card.Text>
                        {brand.brand_description}
                    </Card.Text>
                </Card.Footer>
            </Card>
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row mb-3">
                    <div className="col">
                        <Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Создать продукт
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form>
                                            <Form.Group controlId="title">
                                                <Form.Label>Название</Form.Label>
                                                <Form.Control type="text" onChange={e => this.setState({ newTitle: e.target.value })} />
                                            </Form.Group>

                                            <Form.Group controlId="description">
                                                <Form.Label>Описание</Form.Label>
                                                <Form.Control as="textarea" rows={3} onChange={e => this.setState({ newDescription: e.target.value })} />
                                            </Form.Group>

                                            <div className="mb-3">
                                                <Form.File id="formcheck-api-regular">
                                                    <Form.File.Label>Выберите изображение файла</Form.File.Label>
                                                    <Form.File.Input onChange={this.handleFiles.bind(this)}/>
                                                </Form.File>
                                            </div>
                                            <Button variant="primary" onClick={this.createProduct.bind(this)} className="mr-2">
                                                Создать
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-center">
                    {this.getProductsCard()}
                </div>
            </div>
        );
    }
}