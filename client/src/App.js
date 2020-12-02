import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './components/game/Game';
import Admin from './components/admin/Admin';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/:game_key' component={Game} />
        <Route exact path='admin' component={Admin} />
      </Switch>
    </Router>
  );
};

export default App;
