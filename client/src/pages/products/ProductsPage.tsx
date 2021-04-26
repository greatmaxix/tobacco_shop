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
import InvoicesService from "../../services/invoicesService";

type ProductsPageState = {
    products: ProductType[],
    service: ProductsService,
    imageService: ImagesService,
    invoiceService: InvoicesService,
    images: any[],
    newTitle: string,
    newDescription: string,
    newCost: string,
    newBrandId: any,
    newTypeId: any,
    brands: ProductBrandType[],
    types: ProductTypeType[],
    newImage: any,
    uploadedFile: any,
    invoiceProducts: ProductType[],
}

@inject('userStore', 'routerStore', 'imagesStore')
export default class ProductsPage extends React.Component<any, ProductsPageState>{
    constructor(props: any) {
        super(props);
        this.state = {
            products: [],
            service: new ProductsService(this.props.routerStore),
            imageService: new ImagesService(this.props.routerStore),
            invoiceService: new InvoicesService(this.props.routerStore),
            images: [],
            newTitle: '',
            newDescription: '',
            newCost: '',
            brands: [],
            types: [],
            newBrandId: 1,
            newTypeId: 1,
            newImage: null,
            uploadedFile: null,
            invoiceProducts: [],
        };
    }
    private reader = new FileReader();

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
                let imagesResult = await this.state.imageService.fetchImages({
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
        let brandsResult = await this.state.service.fetchProductBrands({ });
        let typesResult = await this.state.service.fetchProductTypes({ });
        let brands: ProductBrandType[] = [];
        let types: ProductTypeType[] = [];
        if (brandsResult && brandsResult.data && brandsResult.data.length > 0) {
            for (let i = 0; i < brandsResult.data.length; i++) {
                const element = brandsResult.data[i];
                brands.push({
                    id: element.id,
                    brand_name: element.brand_name,
                    brand_description: element.brand_description
                });

            }
        }
        if (typesResult && typesResult.data && typesResult.data.length > 0) {
            for (let i = 0; i < typesResult.data.length; i++) {
                const element = typesResult.data[i];
                types.push({
                    id: element.id,
                    type: element.type,
                });

            }
        }
        this.setState({
            products,
            brands,
            types
        })
    }

    async createProduct() {
        if (!this.state.newBrandId || !this.state.newTypeId || !this.state.newTitle || !this.state.newDescription) {
            //todo show error message on toast!
            return
        }
        let createdNewFile = await this.state.service.createProduct({
            title: this.state.newTitle,
            description: this.state.newDescription,
            cost: parseInt(this.state.newCost),
            productBrand: {
                id: this.state.newBrandId
            },
            productType: {
                id: this.state.newTypeId
            },
        });
        
        if (createdNewFile && createdNewFile.data && createdNewFile.data.id && this.state.uploadedFile && this.state.uploadedFile && this.state.uploadedFile.length > 0) {
            let formData = new FormData();
            formData.append("imageable_type", 'products');
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

    addToInvoice(product: ProductType) {
        let invoiceProducts = this.state.invoiceProducts;
        invoiceProducts.push(product);
        this.setState({
            invoiceProducts
        })
    }

    removeFromInvoice(product: ProductType) {
        let invoiceProducts: ProductType[] = this.state.invoiceProducts;
        let foundIndex = invoiceProducts.findIndex(el => el.id === product.id);
        if (foundIndex > -1) invoiceProducts = invoiceProducts.splice(foundIndex, 1);
        this.setState({
            invoiceProducts
        })
    }

    getInvoiceProductCost() : number {
        let cost = 0;
        for (let i = 0; i < this.state.invoiceProducts.length; i++) {
            const element = this.state.invoiceProducts[i];
            cost += element.cost;
        }
        return cost;
    }

    getTableInvoiceProducts() {
        let alreadyRendered: number[] = [];
        let unique: ProductType[] = [];
        for (let i = 0; i < this.state.invoiceProducts.length; i++) {
            const element = this.state.invoiceProducts[i];
            if (!alreadyRendered.includes(element.id)) {
                unique.push(element);
                alreadyRendered.push(element.id);
            }
        }
        return <tbody>
            {
                unique.map((el: ProductType, index) => {
                    return <tr key={index}>
                        <td>{el.id}</td>
                        <td>{el.title}</td>
                        <td>{this.state.invoiceProducts.filter(ip => ip.id === el.id).length}</td>
                    </tr>
                })    
            }
        </tbody>
    }

    async createInvoice() {
        if (this.state.invoiceProducts && this.state.invoiceProducts.length > 0) {
            let products = [];
            let total_cost = 0;
            for (let i = 0; i < this.state.invoiceProducts.length; i++) {
                const element = this.state.invoiceProducts[i];
                products.push({
                    id: element.id,
                })
                total_cost += element.cost;
            }
            let createdInvoice = await this.state.invoiceService.createInvoice({
                products,
                total_cost
            });
        }
    }

    getProductsCarousel(product: ProductType) {
        return (
            <Carousel>
                {product.images.length > 0 ? product.images.map((image: ImageType, index) => {
                    let src = image && image.mimetype && image.image_blob && image.image_blob.data ? `data:${image.mimetype};base64,${Buffer.from(image.image_blob.data).toString('base64')}` : '';
                    return <Carousel.Item key={index}>
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
                        alt={product.title}
                    />
                    <Carousel.Caption>
                        <h3>{product.cost + " тг"}</h3>
                    </Carousel.Caption>
                </Carousel.Item>}
            </Carousel>
        )
    }

    getProductsCard(): any[] {
        return this.state.products.map((product: ProductType, index) => {
            return <Card key={index} style={{ width: '600px' }}>
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
                <div className="d-flex flex-row justify-content-around pb-2">
                    <div className="">
                        <button className="btn btn-info" onClick={this.addToInvoice.bind(this, product)}>Добавить в счет</button>
                    </div>
                    {
                        this.state.invoiceProducts.find(el => el.id === product.id) ? 
                        <div className="">
                            <button className="btn btn-info" onClick={this.removeFromInvoice.bind(this, product)}>Убрать</button>
                        </div>
                        :
                        ''
                    }
                    <div className="">
                        <Link to={"/products/" + product.id} className="btn btn-success">Подробнее</Link>
                    </div>
                    
                    
                </div>
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

                                            <Form.Group controlId="cost">
                                                <Form.Label>Цена</Form.Label>
                                                <Form.Control type="number" onChange={e => this.setState({ newCost: e.target.value })} />
                                            </Form.Group>

                                            <Form.Group controlId="brand">
                                                <Form.Label>Выберите брэнд</Form.Label>
                                                <Form.Control as="select" onChange={e => this.setState({ newBrandId: e.target.value })}>
                                                    {this.state.brands.map((el: ProductBrandType, index) => {
                                                        return <option key={index} value={el.id}>{el.brand_name}</option>
                                                    })}
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="type">
                                                <Form.Label>Выберите тип</Form.Label>
                                                <Form.Control as="select" onChange={e => this.setState({ newTypeId: e.target.value })}>
                                                    {this.state.types.map((el: ProductTypeType, index) => {
                                                        return <option key={index} value={el.id}>{el.type}</option>
                                                    })}
                                                </Form.Control>
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
                    <div className="col">
                        <Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Создать счет!
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div className="d-flex flex-row justify-content-around pb-2">
                                            <div className="">Счет на сумму: {this.getInvoiceProductCost()} тг</div>
                                            <button className="btn btn-info" onClick={this.createInvoice.bind(this)}>Списать</button>
                                        </div>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>id</th>
                                                    <th>Название продукта</th>
                                                    <th>Кол-во</th>
                                                </tr>
                                            </thead>
                                            {
                                                this.getTableInvoiceProducts()
                                            }
                                        </Table>
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