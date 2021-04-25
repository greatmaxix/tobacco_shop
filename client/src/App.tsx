import { Fragment } from 'react';
import { Route } from 'react-router';
import './App.css';
import ProductsPage from './pages/products/ProductsPage';
import ProductsViewPage from './pages/products/ProductViewPage';
import SignInPage from './pages/signin/SignInPage';
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import SignUpPage from './pages/signup/SignUpPage';

function App() {
  return (
    <Fragment>
      <Nav
        // activeKey="/home"
        onSelect={(selectedKey) => {
          if (selectedKey === "logout") {
            localStorage.removeItem("accessToken");
          }
        }}
      >
        <Nav.Item>
          <Link className="nav-link" to="/products">Products</Link>
        </Nav.Item>
        <Nav.Item>
          {localStorage.getItem('accessToken') ?
            <Nav.Link eventKey="logout">
              Logout
          </Nav.Link>
            : ''
          }
        </Nav.Item>
      </Nav>
      <div className="container-fluid">
        <Route exact path="/" component={ProductsPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/products" component={ProductsPage} />
      </div>

      {/* <Route path="/signup/" component={SignUpPage} /> */}
      {/* <Route exact path="/tasks" component={TasksPage} />
        <Route exact path="/" component={SignInPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/products" component={ProductsPage}/>
        <Route path="/productsbyid/:id" component={ProductsViewPage}/>
        {/* <Route path="/signup/" component={SignUpPage} /> */}
      {/* <Route exact path="/tasks" component={TasksPage} />
        <Route exact path="/tasks/create" component={CreateTaskPage} /> */}
    </Fragment>
  );
}

export default App;
