const { GENESIS_DATA } = require('./config');

// block class
class Block{
    // constructor for the block class
    constructor({timestamp, lastHash, hash, data}){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    // static genesis block function
    static genesis() {
        return new Block(GENESIS_DATA);
    }

    // mining the block
    static mineBlock ({lastBlock, data}){
        return new this({
            timestamp: Date.now(),
            lastHash: lastBlock.hash,
            data});
    }
}

module.exports = Block;