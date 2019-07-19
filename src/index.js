import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import Dashboard from './Dashboard';
import Signup from './Signup.jsx';

ReactDOM.render(
  <Provider store={store}>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter basename="/">
				<Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
    </BrowserRouter>
  </ThemeProvider>
  </Provider>
  ,document.querySelector('#root'),
);