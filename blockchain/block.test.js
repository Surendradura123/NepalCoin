// calling the classes
const Block = require('./block');
const { GENESIS_DATA, MINE_RATE } = require('../config');
const cryptoHash = require('../cryptohash/crypto-hash')


// using the key library called describe to test the test and used the block class using callback function
describe('Block', () => {
    const timestamp = 2000;
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const nonce = 1;
    const difficulty = 4;
    const block = new Block({ timestamp, lastHash, hash, data, nonce, difficulty });

    //it function to test the block class
    it('has a timestamp, lastHash, hash, and data property', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);

    });

    // describe function to test the genesis block
    describe('genesis()', () => {
        const genesisBlock = Block.genesis();
        // print the genesis block
        console.log('genesisBlock', genesisBlock);
    
        it('returns a Block instance', () => {
          expect(genesisBlock instanceof Block).toBe(true);
        });
    
        it('returns the genesis data', () => {
          expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

    // mine block function testing
    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({ lastBlock, data });
    
        it('returns a Block instance', () => {
          expect(minedBlock instanceof Block).toBe(true);
        });

        it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
          expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the `data`', () => {
          expect(minedBlock.data).toEqual(data);
        });
      
        it('sets a `timestamp`', () => {
          expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        //checking the  SHA-256 hash function
        it('creates a SHA-256 `hash` based on the proper inputs', () => {
            expect(minedBlock.hash)
                .toEqual(
                    cryptoHash(
                        minedBlock.timestamp,
                        minedBlock.nonce,
                        minedBlock.difficulty,
                        lastBlock.hash,
                        data
                    )
                );
        });

        //checking the difficulty
        it('sets a `hash` that matches the difficulty criteria', () => {
            expect(minedBlock.hash.substring(0, minedBlock.difficulty))
              .toEqual('7'.repeat(minedBlock.difficulty));
        });

        // adjust the difficulty inside the mine block
        it('adjusts the difficulty', () => {
            const possibleResults = [lastBlock.difficulty+1, lastBlock.difficulty-1];

            expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);
        });
    });

    //ajusting the Difficulty
    describe('adjustDifficulty()', () => {
        it('raises the difficulty for a quickly mined block', () => {
            expect(Block.adjustDifficulty({
              originalBlock: block, timestamp: block.timestamp + MINE_RATE - 100
            })).toEqual(block.difficulty+1);
        });
      
        it('lowers the difficulty for a slowly mined block', () => {
            expect(Block.adjustDifficulty({
              originalBlock: block, timestamp: block.timestamp + MINE_RATE + 100
            })).toEqual(block.difficulty-1);
        });

        it('has a lower limit of 7', () => {
            block.difficulty = 7776;

            expect(Block.adjustDifficulty({ originalBlock: block })).toEqual(7777);
        })
    });
});