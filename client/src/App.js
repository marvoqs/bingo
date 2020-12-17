import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Routing
import GameRoute from './components/routing/GameRoute';
import Routes from './components/routing/Routes';

// Components
import Game from './components/game/Game';
import GamePinned from './components/game/GamePinned';

// CSS
import './styles/global.css';

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
        <Switch>
          <GameRoute exact path='/' component={GamePinned} />
          <GameRoute exact path='/game/:gameKey' component={Game} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
