import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminNavbar from '../layout/Navbar';
import AdminGames from './AdminGames';
import AdminUsers from './AdminUsers';

const Admin = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/admin/games' component={AdminGames} />
        <Route exact path='/admin/users' component={AdminUsers} />
      </Switch>
    </Router>
  );
};

export default Admin;
