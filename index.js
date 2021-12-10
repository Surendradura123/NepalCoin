const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const Blockchain = require('./blockchain');
const PubSub = require('./app/pubsub');

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

//setTimeout(() => pubsub.broadcastChain(), 1000);

//middleware
app.use(bodyParser.json());

//get request
app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain);

});

//post method
app.post('/api/mine', (req, res) => {
    const { data} = req.body;

    blockchain.addBlock({ data });

    pubsub.broadcastChain();

    res.redirect('/api/blocks');
});


// syncing the chains in apis
const syncChains = () => {
    request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (error, respone, body) => {
        if(!error && respone.statusCode === 200) {
            const rootChain = JSON.parse(body);

            console.log('replace chain on  a sync with', rootChain)
            blockchain.replaceChain(rootChain);
        }
    });
};

// setting the port of the apis
let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
    console.log(`listening at localhost:${PORT}`);

    if (PORT !== DEFAULT_PORT) {
        syncChains();
    }
});
