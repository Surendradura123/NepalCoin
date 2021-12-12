const { GENESIS_DATA,INITIAL_DIFFICULTY, MINE_RATE } = require('../config');
const {cryptoHash} = require('../cryptohash');

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
        //return new this('Genesis time', '-----', '0', [], 0, DIFFICULTY);
    }

    // mining the block
    static mineBlock ({lastBlock, data}){
        const lastHash = lastBlock.hash;
        let hash, timestamp;
        let { difficulty } = lastBlock;
        let nonce = 0;

        // developing the hash using difficulity and the nonce
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp });
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

        } while (hash.substring(0, difficulty) !== '7'. repeat(difficulty));

        return new this({timestamp,lastHash,data,difficulty,nonce,hash});
    }

    // adjust difficulty
    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;

        if(difficulty < 4) return 4;

        if((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty - 1;

        return difficulty + 1;
    }
}

module.exports = Block;