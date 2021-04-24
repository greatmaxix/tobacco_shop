import { Fragment } from 'react';
import { Route } from 'react-router';
import './App.css';
import SignInPage from './pages/signin/SignInPage';

function App() {
  return (
    <Fragment>
        <Route exact path="/" component={SignInPage} />
        <Route path="/signin/" component={SignInPage} />
        {/* <Route path="/signup/" component={SignUpPage} /> */}
        {/* <Route exact path="/tasks" component={TasksPage} />
        <Route exact path="/tasks/create" component={CreateTaskPage} /> */}
      </Fragment>
  );
}

export default App;
