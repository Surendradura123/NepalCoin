//calling the classes
const Block = require('./block');
const cryptoHash = require('./crypto-hash');

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

    // validating the chain
    static isValidChain(chain) {
        // it show that chain should start with genesis block
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false
        };

        // making a validating chain in loop
        for (let i=1; i<chain.length; i++) {
            const { timestamp, lastHash, hash, data } = chain[i];
            const actualLastHash = chain[i-1].hash;
      
            if (lastHash !== actualLastHash) return false;
      
            const validatedHash = cryptoHash(timestamp, lastHash, data);
      
            if (hash !== validatedHash) return false;
      
        }

        return true;

    }

}

module.exports = Blockchain;