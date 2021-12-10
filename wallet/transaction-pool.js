const Transaction = require('./transaction');

class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  clear() {
    this.transactionMap = {};
  }

  //setting the transaction using id
  setTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }
  // mapping the transaction
  setMap(transactionMap) {
    this.transactionMap = transactionMap;
  }
  // existing transaction in the trnsaction pool
  existingTransaction({ inputAddress }) {
    const transactions = Object.values(this.transactionMap);

    return transactions.find(transaction => transaction.input.address === inputAddress);
  }
 //validing the transaction
  validTransactions() {
    return Object.values(this.transactionMap).filter(
      transaction => Transaction.validTransaction(transaction)
    );
  }

  //clear transaction in blockchain if the chain in the thransaction is updated
  clearBlockchainTransactions({ chain }) {
    for (let i=1; i<chain.length; i++) {
      const block = chain[i];

      for (let transaction of block.data) {
        if (this.transactionMap[transaction.id]) {
          delete this.transactionMap[transaction.id];
        }
      }
    }
  }
}

module.exports = TransactionPool;