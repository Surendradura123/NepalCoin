// calling the classes
const Block = require('./block');
const { GENESIS_DATA } = require('./config');
//const cryptoHash = require('./crypto-hash')


// using the key library called describe to test the test and used the block class using callback function
describe('Block', () => {
    const timestamp = 2000;
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({ timestamp, lastHash, hash, data });

    //it function to test the block class
    it('has a timestamp, lastHash, hash, and data property', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
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
    });
});