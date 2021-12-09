const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

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
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        return new this({
            timestamp,
            lastHash,
            data,
            hash: cryptoHash(timestamp, lastHash, data)
        });
    }
}

module.exports = Block;