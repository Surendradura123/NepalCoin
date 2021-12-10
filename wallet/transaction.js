const uuid = require('uuid').v1;
const { verifySignature } = require('../cryptohash');

class Transaction {
    constructor({ senderWallet, recipient, amount, outputMap, input }) {
      this.id = uuid();
      this.outputMap = outputMap || this.createOutputMap({ senderWallet, recipient, amount });
      this.input = input || this.createInput({ senderWallet, outputMap: this.outputMap });
    }

    //output the transaction in the wallet
    createOutputMap({ senderWallet, recipient, amount }) {
        const outputMap = {};

        outputMap[recipient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount;

        return outputMap;
    }

    //input the transaction in the wallet
    createInput({ senderWallet, outputMap }) {
        return {
          timestamp: Date.now(),
          amount: senderWallet.balance,
          address: senderWallet.publicKey,
          signature: senderWallet.sign(outputMap)
        };
    }

    //valid the transaction function
    static validTransaction(transaction) {
        const { input: { address, amount, signature }, outputMap } = transaction;
    
        const outputTotal = Object.values(outputMap)
          .reduce((total, outputAmount) => total + outputAmount);
    
        if(amount !== outputTotal) {
          console.error(`Invalid transaction from ${address}`);
          return false;
        }
    
        if(!verifySignature({ publicKey: address, data: outputMap, signature })) {
          console.error(`Invalid signature from ${address}`);
          return false;
        }
    
        return true;
    }
}

module.exports = Transaction;