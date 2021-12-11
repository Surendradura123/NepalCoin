import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';

class Block extends Component {
    state = { displayTransaction: false };

    toggleTransaction = () => {
        this.setState({ displayTransaction: !this.state.displayTransaction });
    }

    get displayTransaction() {
        const { data } = this.props.block;

        
        const stringfiedData = JSON.stringify(data);

        const dataDisplay = stringfiedData.length > 35 ?
            `${stringfiedData.substring(0, 35)}...`:
        stringfiedData;

        if (this.state.displayTransaction) {
            return (
                <div>
                    {
                        data.map(transaction => (
                            <div key={transaction.id}>
                                <hr />
                                <Transaction transaction = { transaction} />
                            </div>
                        ))
                    }
                    <br />
                    <Button variant="danger" size="sm" onClick= {this.toggleTransaction}>
                        Show Less
                    </Button>

                </div>
            )
        }
        
        return (
            <div>
                <div>Data: { dataDisplay } </div>

                <Button variant="danger" size="sm" onClick= {this.toggleTransaction}>
                    Show More
                </Button>
            </div>
        );
    }

    //render method
    render() {
        const { timestamp, hash } = this.props.block;
       
        // the hash of the block
        const hashDisplay = `${hash.substring(0, 256)}...`;
        
        //display the details of the blocks which is mined
        return (
            <div className='Block'>
                <div>Hash: {hashDisplay}</div>
                <div>Timestamp: {new Date(timestamp). toLocaleString()}</div>
                { this.displayTransaction}
            </div>
        )

    }
};

export default Block;