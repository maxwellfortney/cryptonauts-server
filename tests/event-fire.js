const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3');
const Contract = require('web3-eth-contract');

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/48dbaad3d97f4f6abebb51c4df73e834'));

const account = require('./test-wallet.json');

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

function makeEmitMinedEvent() {
  web3.eth.getTransactionCount(account.address, (err, txCount) => {
    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      to:       "0x54b1f3eC9D8D5c57254B940152168191c0AeB8bF",
      value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
      gasLimit: web3.utils.toHex(web3.utils.toWei('10000000', 'gwei')),
      gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei')),
      gas: 100000,
      data: contract.methods.emitFakeMine().encodeABI()
    }

    const tx = new Tx(txObject, { chain: 'rinkeby' })
    tx.sign(Buffer.from(account.privateKey, 'hex'))

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      console.log('txHash:', txHash)
    })
  })
}

makeEmitMinedEvent();