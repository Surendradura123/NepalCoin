const { STARTING_BALANCE } = require('../config');
const cryptoHash = require('../cryptohash/crypto-hash')
const { ec } = require('../cryptohash');

class Wallet {
    constructor() {
      this.balance = STARTING_BALANCE;
  
      this.keyPair = ec.genKeyPair();
  
      this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    // sign the key method
    sign(data) {
        return this.keyPair.sign(cryptoHash(data));
    }
};

module.exports = Wallet;