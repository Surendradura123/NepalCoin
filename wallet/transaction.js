const uuid = require('uuid').v1;

class Transaction {
    constructor({ senderWallet, recipient, amount, outputMap, input }) {
      this.id = uuid();
      this.outputMap = outputMap || this.createOutputMap({ senderWallet, recipient, amount });
      //this.input = input || this.createInput({ senderWallet, outputMap: this.outputMap });
    }

    createOutputMap({ senderWallet, recipient, amount }) {
        const outputMap = {};

        outputMap[recipient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount;

        return outputMap;
    }
}

module.exports = Transaction;