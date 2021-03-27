const contractJSON = require('./Cryptonauts.json');

const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3');
const Contract = require('web3-eth-contract');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/48dbaad3d97f4f6abebb51c4df73e834'));

test_abi = [
    {
        "inputs": [],
        "name": "emitFakeMine",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "Mined",
        "type": "event"
    }
]

var contract = new web3.eth.Contract(test_abi, "0x54b1f3eC9D8D5c57254B940152168191c0AeB8bF");

class OurContract {

    static registerMineEventHandler(handle) {
        contract.events.Mined(function(err, ev) {
            handle(err, ev);
        });
    }

    static async getTxn(txHash) {
        return await web3.eth.getTransaction(txHash);
    }
}

OurContract.registerMineEventHandler((a, b) => {});

module.exports = OurContract;