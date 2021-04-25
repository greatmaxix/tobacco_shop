import React from "react";
import { Card } from 'react-bootstrap'
import { inject } from 'mobx-react';
import { ProductType } from "../../types/ProductType";
import ImagesStore from "../../stores/ImagesStore";
import ProductStore from "../../stores/ProductStore";

type ProductsViewPageState = {
    product: ProductType | null,
    images: any[],
}

type ProductsViewPageProps = {
    imagesStore: ImagesStore,
    productsStore: ProductStore,
}

@inject('userStore', 'routerStore', 'imagesStore', 'productsStore')
export default class ProductsViewPage extends React.Component<ProductsViewPageProps, ProductsViewPageState>{
    constructor(props: any) {
        super(props);
        this.state = {
            product: null,
            images: [],
        };
    }
    componentDidMount() {
        this.reload();
    }

    async reload() {

    }

    render() {
        return (
            <div>

            </div>
        );
    }
}