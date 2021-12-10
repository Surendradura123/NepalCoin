const Transaction = require('./transaction');
const Wallet = require('./index');
const { verifySignature } = require('../cryptohash');


describe('Transaction', () => {
    let transaction, senderWallet, recipient, amount;
  
    beforeEach(() => {
      senderWallet = new Wallet();
      recipient = 'recipient-public-key';
      amount = 50;
      transaction = new Transaction({ senderWallet, recipient, amount });
    });

    //checking the transaction have a id
    it('has an `id`', () => {
        expect(transaction).toHaveProperty('id');
    });

    //recipient transaction checking
    describe('outputMap', () => {
        it('has an `outputMap`', () => {
          expect(transaction).toHaveProperty('outputMap');
        });
    
        it('outputs the amount to the recipient', () => {
          expect(transaction.outputMap[recipient]).toEqual(amount);
        });
    
        it('outputs the remaining balance for the `senderWallet`', () => {
          expect(transaction.outputMap[senderWallet.publicKey])
            .toEqual(senderWallet.balance - amount);
        });
    });
    
});