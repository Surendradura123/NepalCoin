const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-cbfd17cc-e580-40c8-a55e-0cfbfeecbde6',
  subscribeKey: 'sub-c-9a1556a6-59a2-11ec-931a-1addb9510060',
  secretKey: 'sec-c-MmMyN2YzZTktOGNlZi00NGI0LWExOGQtMWU4ODkzMmEyM2Jk'

};

const CHANNELS = {
  TEST : 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN' 
};

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;

    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: [Object.values(CHANNELS)] });

    this.pubnub.addListener(this.listener());
  }

  
  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }

  subscribeToChannels() {
    this.pubnub.subscribe({
      channels: [Object.values(CHANNELS)]
    });
  }

  listener() {
    return {
      message: messageObject => {
        const {channel, message } = messageObject;

        console.log(`Message received. Channel: ${channel}. Message: ${message}`);
        const parsedMessage = JSON.parse(message);

        if(channel === CHANNELS.BLOCKCHAIN){
          this.blockchain.replaceChain(parsedMessage);
        }
        
      }
    };
  }

  //this is the subscribe function in pubsub
  publish({ channel, message }){
    this.pubnub.publish({ channel, message });
  }

  //broadacsting the chain
  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }
}

//const testPubSub = new PubSub();

//testPubSub.publish({ channel: CHANNELS.TEST, message: 'hello pubnub'});

module.exports = PubSub;

