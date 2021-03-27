const OurContract = require('./contract.js');

const exampleEvent = {
    removed: false,
    logIndex: 3,
    transactionIndex: 4,
    transactionHash: '0xcf5c130c4a5fc7d77075a929b44acc674bb60715f0b068016bf039b6a4d60c2b',
    blockHash: '0x1bb76801fd352ba90eb7acf23057bdba092c2e797a3bd13bf26b2d39a622f650',
    blockNumber: 8309061,
    address: '0x54b1f3eC9D8D5c57254B940152168191c0AeB8bF',
    id: 'log_e8508be2',
    returnValues: /* Result */ { '0': '15', _tokenId: '15' },
    event: 'Mined',
    signature: '0x4229d50c63dbdc5551dd68e0a9879b01ac250cb31feaeba7588533462e6c7aaa',
    raw: {
        data: '0x',
        topics: [
            '0x4229d50c63dbdc5551dd68e0a9879b01ac250cb31feaeba7588533462e6c7aaa',
            '0x000000000000000000000000000000000000000000000000000000000000000f'
        ]  
    }
}

class Generator {
    static generate(mineEvent) {
        return { }
    }
}

module.exports = Generator;