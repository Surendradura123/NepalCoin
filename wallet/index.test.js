const Wallet = require('./index');
const { verifySignature } = require('../cryptohash');
const Blockchain = require('../blockchain');
const { STARTING_BALANCE } = require('../config');

describe('Wallet', () => {
    let wallet;
  
    beforeEach(() => {
      wallet = new Wallet();
    });
  
    it('has a `balance`', () => {
      expect(wallet).toHaveProperty('balance');
    });
  
    it('has a `publicKey`', () => {
      //console.log(wallet.publicKey);
      expect(wallet).toHaveProperty('publicKey');
    });

    //checking the siging keyss
    describe('signing data', () => {
        const data = 'foobar';
    
        it('verifies a signature', () => {
          expect(
            verifySignature({
              publicKey: wallet.publicKey,
              data,
              signature: wallet.sign(data)
            })
          ).toBe(true);
        });
    
        it('does not verify an invalid signature', () => {
          expect(
            verifySignature({
              publicKey: wallet.publicKey,
              data,
              signature: new Wallet().sign(data)
            })
          ).toBe(false);
        });
    });
});  