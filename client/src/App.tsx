import { Fragment } from 'react';
import { Route } from 'react-router';
import './App.css';
import ProductsPage from './pages/products/ProductsPage';
import SignInPage from './pages/signin/SignInPage';
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import SignUpPage from './pages/signup/SignUpPage';

function App() {
  return (
    <Fragment>
      <Nav>
        <Nav.Item>
          <Link className="nav-link" to="/products">Products</Link>
        </Nav.Item>
      </Nav>
      <div className="container-fluid">
        <Route path="/" component={ProductsPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route path="/signup/" component={SignUpPage} />
        <Route path="/products" component={ProductsPage} />
      </div>

      {/* <Route path="/signup/" component={SignUpPage} /> */}
      {/* <Route exact path="/tasks" component={TasksPage} />
        <Route exact path="/tasks/create" component={CreateTaskPage} /> */}
    </Fragment>
  );
}

export default App;
