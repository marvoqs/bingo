import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Game from './components/game/Game';
import Admin from './components/admin/Admin';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import AdminGames from './components/admin/games/Games';
import AdminGame from './components/admin/game/Game';
import CreateGame from './components/admin/game-forms/CreateGame';
import AdminUsers from './components/admin/AdminUsers';
import PrivateRoute from './components/routing/PrivateRoute';

// CSS
import './styles/global.css';
import './styles/admin.css';

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
            <Route exact path='/game/:gameKey' component={Game} />
            <PrivateRoute exact path='/admin' component={Admin} />
            <PrivateRoute exact path='/admin/games' component={AdminGames} />
            <PrivateRoute exact path='/admin/games/create' component={CreateGame} />
            <PrivateRoute exact path='/admin/game/:gameId' component={AdminGame} />
            <PrivateRoute exact path='/admin/users' component={AdminUsers} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
