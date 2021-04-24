import React from "react";
import { Card } from 'react-bootstrap'
import { inject } from 'mobx-react';
import ProductsService from "../../services/productsService";
import { ProductType } from "../../types/ProductType";

type ProductsPageState = {
    products: ProductType[],
    service: ProductsService,
}


@inject('userStore', 'routerStore')
export default class ProductsPage extends React.Component<any, ProductsPageState>{
    constructor(props: any) {
        super(props);
        this.state = {
            products: [],
            service: new ProductsService(this.props.routerStore)
        };
    }
    componentDidMount() {
        this.reload();
    }
    async reload() {
        let result = await this.state.service.fetchProducts({ title: null, product_types_id: null, product_brands_id: null });
        if (result && result.data && result.data.length > 0) {
            let products: ProductType[] = [];
            for (let i = 0; i < result.data.length; i++) {
                const element = result.data[i];
                products.push({
                    id: element.id,
                    title:element.title,
                    description: element.description,
                    cost: element.cost,
                    updated_at: element.updated_at,
                    created_at: element.created_at
                });
                
            }
            this.setState({
                products
            })
        }
        console.log(this.state.products)
    }

    getProductsCard(): any[] {
        return this.state.products.map((data:any) => {
            return
            <Card>
                <Card.Body>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Title>data.title</Card.Title>
                    <Card.Text>
                        data.descrition
      </Card.Text>
                    <Card.Text>amounts: 5000kg</Card.Text>
                </Card.Body>
            </Card>
        })
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}