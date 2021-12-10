//calling the classes
const Block = require('./block');
const { cryptoHash } = require('../cryptohash');

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

    //replacing chain function
    replaceChain(chain){
        if (chain.length <= this.chain.length) {
            console.error('The incoming chain must be longer')
            return;
        }
        if(!Blockchain.isValidChain(chain)){
            console.error('The incoming chain must be valid');
            return;
        }

        console.log('replacing chain with', chain);
        this.chain = chain;
    }

    // validating the chain
    static isValidChain(chain) {
        // it show that chain should start with genesis block
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false
        };

        // making a validating chain in loop
        for (let i=1; i<chain.length; i++) {
            const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[i];
            const actualLastHash = chain[i-1].hash;
            const lastDifficulty = chain[i-1].difficulty;
      
            if (lastHash !== actualLastHash) return false;
      
            const validatedHash = cryptoHash(timestamp, lastHash, data , nonce, difficulty);
      
            if (hash !== validatedHash) return false;

            if ((lastDifficulty - difficulty) > 1) return false;
      
        }

        return true;

    }

}

module.exports = Blockchain;