import React from "react";
import { inject } from 'mobx-react';

@inject('userStore', 'routerStore')
export default class SignInPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div></div>
        );
    }
}