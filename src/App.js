import React from 'react';
import './App.css';
import Main from './Student/Main'
import { BrowserRouter, Route } from 'react-router-dom'
require('./bootstrap');


const App = () => (
    <BrowserRouter>
        <div className="sans-serif">
            <Route path="/" component={Main} />
        </div>
    </BrowserRouter>
);



export default App;

