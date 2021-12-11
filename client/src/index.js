import React from 'react';
import { render } from 'react-dom';
import {Router, Switch, Route } from 'react-router-dom';
import history from './history';
import App from './components/App';
import Blocks from './components/Blocks';
import ConductTransaction from './components/ConductTransaction';
import TransactionPool from './components/TransactionPool';
import'./index.css';

render(
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={App}/>  
            <Route exact path="/blocks" component={Blocks}/>
            <Route exact path='/conduct-transaction' component={ConductTransaction} />
            <Route exact path='/transaction-pool' component={TransactionPool} />
        </Switch>
    </Router>, 
    document.getElementById('root')
);



