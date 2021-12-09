const { GENESIS_DATA, MINE_RATE } = require('./config');
const cryptoHash = require('./crypto-hash');

// block class
class Block{
    // constructor for the block class
    constructor({timestamp, lastHash, hash, data, nonce, difficulty}){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    // static genesis block function
    static genesis() {
        return new Block(GENESIS_DATA);
    }

    // mining the block
    static mineBlock ({lastBlock, data}){
        let hash, timestamp;
        //const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const { difficulty } = lastBlock;
        let nonce = 0;

        // developing the hash using difficulity and the nonce
        do {
            nonce++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

        } while (hash.substring(0, difficulty) !== '7'. repeat(difficulty));

        return new this({timestamp,lastHash,data,difficulty,nonce,hash});
    }

    // adjust difficulty
    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;

        if((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty - 1;


        return difficulty + 1;
    }
}

module.exports = Block;