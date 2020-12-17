import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Layout components
import Alert from '../layout/Alert';
import Navbar from '../layout/Navbar';

// Routing
import PrivateRoute from './PrivateRoute';

// Route Components
import Login from '../auth/Login';
import Register from '../auth/Register';
import AdminGames from '../admin/games/Games';
import AdminGame from '../admin/game/Game';
import CreateGame from '../admin/game-forms/CreateGame';
import AdminUsers from '../admin/users/Users';

// CSS
import '../../styles/admin.css';

const Routes = () => {
  return (
    <>
      <Navbar />
      <section className='container'>
        <Alert />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/admin' component={AdminGames} />
          <PrivateRoute exact path='/admin/games' component={AdminGames} />
          <PrivateRoute exact path='/admin/games/create' component={CreateGame} />
          <PrivateRoute exact path='/admin/game/:gameId' component={AdminGame} />
          <PrivateRoute exact path='/admin/users' component={AdminUsers} />
        </Switch>
      </section>
    </>
  );
};

export default Routes;
