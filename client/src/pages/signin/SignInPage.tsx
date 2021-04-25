import React from "react";
import { inject } from 'mobx-react';
import { Alert, Button, Form } from "react-bootstrap";

@inject('userStore', 'routerStore')
export default class SignInPage extends React.Component<any, any> {
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

    goToSignUp = () => {
        this.props.routerStore.push('/signup')
    };

    render() {
        const { errorMessage } = this.state;

        return (
            <div className="container-fluid">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={e => this.setState({ username: e.target.value })} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" onClick={this.submit} className="mr-2">
                        Sign in
                    </Button>
                    <Button onClick={this.goToSignUp}>
                        Register
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