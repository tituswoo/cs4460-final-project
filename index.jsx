import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import LandingPage from './components/LandingPage';
import ReportPage from './components/ReportPage';

import {Router, Route, IndexRoute, Link, Redirect} from 'react-router';

class Dashboard extends React.Component {
  render() {
    return (
      <div>Dashboard page!</div>
    );
  }
}

class Report extends React.Component {
  render() {
    return (
      <div>
        <h4>Report for "{this.props.params.id}"</h4>
      </div>
    );
  }
}

class Step1 extends React.Component {
  render() {
    return (
      <div className='step-1'>
        <h1 className='step-1__question'>
          <span className='step-1__question-text'>Should I move from</span>
          <p className='step-1__question-segment'>
            <input className='input' type='text' />
            <span style={{marginRight: 10}}>to</span>
            <input className='input' type='text' />?
          </p>
        </h1>
      </div>
    );
  }
}

ReactDOM.render((
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={Step1} />
      <Route path='landingpage' component={LandingPage} />
      <Route path='reportpage' component={ReportPage}>
        <Route path='/reports/:id' component={Report} />
        <Redirect from='reports/:id' to='/reports/:id' />
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
