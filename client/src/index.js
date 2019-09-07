import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* Styles */
import './styles/index.scss';
/* Pages */
import Home from './pages/Home';
import Vote from './pages/Vote';
/* Provider */
import { VotesProvider } from './context';

const App = () => {
  return (
    <VotesProvider>
      <Router>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/vote'} component={Vote} />
        </Switch>
      </Router>
    </VotesProvider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
