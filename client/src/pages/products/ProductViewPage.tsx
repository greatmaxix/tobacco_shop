import React from "react";
import { inject } from 'mobx-react';
import { ProductType } from "../../types/ProductType";
import ImagesStore from "../../stores/ImagesStore";
import ProductStore from "../../stores/ProductStore";
import ProductsService from "../../services/productsService";
import { RouterStore } from "mobx-react-router";

type ProductsViewPageState = {
    product: ProductType | null,
    service: ProductsService,
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
            images: [],
        };
    }
    componentDidMount() {
        this.reload();
    }

    async reload() {
        console.log(this.props);
        let result = await this.state.service.getProduct(this.props.match.params.id);
        console.log(result)


    }

    render() {
        return (
            <div>
                    hui
            </div>
        );
    }
}