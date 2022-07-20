import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListActions from './pages/ListActions';
import BuyAndSell from './pages/BuyAndSell';
import Account from './pages/Account';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import InvProvider from './context/InvProvider';
import './App.css';

function App() {
  return (
    <InvProvider>
      <Switch>
        <Route exact path="/listActions" component={ ListActions } />
        <Route exact path="/buyAndSell" component={ BuyAndSell } />
        <Route exact path="/account" component={ Account } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="" component={ Login } />
        <Route path="/*" component={ NotFound } />
      </Switch>
    </InvProvider>
  );
}

export default App;
