import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Game from './components/game/Game';
import Admin from './components/admin/Admin';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';

// CSS
import './App.css';

// Utils
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/:game_key' component={Game} />
            <PrivateRoute exact path='admin' component={Admin} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
