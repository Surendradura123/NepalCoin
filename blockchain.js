//calling the classes
const Block = require('./block');

// creating the blockchain class
class Blockchain {

    // making the blockchain using genesis block
    constructor() {
        this.chain = [Block.genesis()];
    }

    //adding the block in chain
    addBlock({ data}){
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length-1],
            data
        });

        this.chain.push(newBlock);
    }

}

module.exports = Blockchain;