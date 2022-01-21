import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/nepalcoin.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from "./NavbarComp";

class App extends Component{
    state = { walletInfo: { }};

    componentDidMount(){
        // fetching the wallet-info
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
            .then(json => this.setState({ walletInfo: json }));
    }

    render() {
        const { address, balance } = this.state.walletInfo;

        return(
            <div className='App'>
                <NavbarComp />
                <br/>
                <div>
                <img className='logo' src={logo}></img>
                </div>
                <br/>
                <div>Welcome to the NepalCoin.....</div>
                <br/>
                
                <br/>
                <div className='WalletInfo'>
                    <div><h1>Wallet Information</h1></div>
                    <div> Address:{address} </div>
                    <div> Balance: {balance} </div>
                </div>
            </div>
        );
    }
}

export default App;

