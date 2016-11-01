import React from 'react';
import { render } from 'react-dom';
import {browserHistory, IndexRoute, Route, Router} from 'react-router');

import App from './public/components/App');
import About from './public/components/About');
import Polls from './public/components/Polls');

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Polls} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
), document.getElementById('root'));
