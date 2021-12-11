import React, { Component } from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/nepalcoin.png';

class App extends Component{
    state = { walletInfo: { }};

    componentDidMount(){
        // fetching the wallet-info
        fetch('http://localhost:3000/api/wallet-info')
            .then(response => response.json())
            .then(json => this.setState({ walletInfo: json }));
    }

    render() {
        const { address, balance } = this.state.walletInfo;

        return(
            <div className="App">
                <img className="logo" src={logo}></img>
                <br/>
                <div>Welcome to the NepalCoin.....</div>
                <br/>
                <div><Link to="/blocks">Blocks</Link></div>
                <div><Link to="/conduct-transaction">Conduct Transaction</Link></div>
                <div><Link to="/transaction-pool">Transaction Pool</Link></div>
                <br/>
                <div className='WalletInfo'>
                    <div>Address: {address} </div>
                    <div>Balance: {balance} </div>
                </div>
            </div>
        );
    }
}

export default App;

//npm i babel-core babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread babel-preset-env babel-preset-react --save