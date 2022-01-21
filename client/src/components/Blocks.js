import React, { Component } from "react";
import { Link } from "react-router-dom";
import Block from "./Block";
import NavbarComp from "./NavbarComp";
import logo from '../assets/nepalcoin.png';
import { Container } from "react-bootstrap";

class Blocks extends Component{
    state = { blocks: []};

    componentDidMount() {
        fetch(`${document.location.origin}/api/blocks`)
            .then(response => response.json())
            .then(json => this.setState({ blocks: json }));

    }

    render() {
        console.log('this.state', this.state);

        return(
            <div className="App">
                <NavbarComp />
                <br/>
                <div>
                    <img className="logo" src={logo}></img>
                </div>
                <br/>
                <h3>BlockChain</h3>
                <p>----------------------------</p>
                <div>
                    {
                        this.state.blocks.map(block => {
                            return(
                                <Block key={block.hash} block = {block} />
                            );
                        })
                    }
                </div>

                
            </div>
        );
    }
}

export default Blocks;