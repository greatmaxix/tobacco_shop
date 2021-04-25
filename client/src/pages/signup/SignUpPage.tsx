import React from "react";
import { inject } from 'mobx-react';
import { Form, Button, Alert } from "react-bootstrap";

@inject('userStore', 'routerStore')
export default class SignUpPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMesssage: null,
        };
    }

    submit = async () => {
        this.setState({ errorMessage: null });
        const { username, password } = this.state;
        try {
            await this.props.userStore.signin(username, password);
            this.props.routerStore.push('/products');
        } catch (error) {
            const errorMessage = error.response.data.message;
            this.setState({ errorMessage });
        }
    };

    goToSignIn = () => {
        this.props.routerStore.push('/signin')
    };

    render() {
        const { errorMessage } = this.state;

        return (
            <div className="container-fluid">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => this.setState({ username: e.target.value })} />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" onChange={e => this.setState({ first_name: e.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="formBasicLastName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" onChange={e => this.setState({ last_name: e.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" onClick={this.submit}>
                        Sign Up
                    </Button>
                    <Button onClick={this.goToSignIn}>
                        Login
                    </Button>
                    { errorMessage ?
                    <Alert variant="danger" dismissible>
                        <Alert.Heading>Something went wrong</Alert.Heading>
                        <p>
                          {errorMessage}
                        </p>
                    </Alert>
                    : '' 
                    }
                </Form>
            </div>
        );
    }
}