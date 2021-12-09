// calling the classes
const Blockchain = require('./blockchain');
const Block = require('./block');

// blockchain test
describe('Blockchain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain;
    });

    // creating a empty array to make blockchain test
    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });
    
    // blockchain start with genesis block test
    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    //adding block to the chain test
    it('adds a new block to the chain', () => {
        const newData = 'foo bar';
        blockchain.addBlock({ data: newData });
    
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    });

    //chain validation test
    describe('isValidChain()', () => {
        // chain doesnot start with genesis block test
        describe('when the chain does not start with the genesis block', () => {
          it('returns false', () => { 
            blockchain.chain[0] = { data: 'fake-genesis' };
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
          });
        });

        // chain start with genesis block test
        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            //making common function using beforeach method 
            beforeEach(() => {
                blockchain.addBlock({ data: 'Bears' });
                blockchain.addBlock({ data: 'Beets' });
                blockchain.addBlock({ data: 'Battlestar Galactica' });
            });

            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'broken-lastHash';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false); 
                });
            });
    
            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'some-bad-and-evil-data';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
             });

            describe('and the chain does not contain any invalid blocks', () => {
                it('returns true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            });
        });
    });
});