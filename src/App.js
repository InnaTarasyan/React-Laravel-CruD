import React from 'react';
import './App.css';
import Main from './Student/Main'
import { Route, Switch } from 'react-router-dom'

require('./bootstrap');

const App = () => (
    <Switch>
        <Route path="/" component={Main} />
    </Switch>
);

export default App;

