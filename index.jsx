import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Explore from './components/Explore';
import {Router, Route, IndexRoute, Link, Redirect} from 'react-router';

ReactDOM.render((
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={Step1} />
      <Redirect from='step1' to='/' />
      <Route path='step2' component={Step2} />
      <Route path='explore' component={Explore} />
    </Route>
  </Router>
), document.getElementById('app'));
