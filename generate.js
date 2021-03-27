const OurContract = require('./contract.js');
const { addWallet } = require('./db.js');
const Chance = require('chance').Chance();
const DB = require('./db.js');

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

function runProbTree(obj) {
    pairs = Object.entries(obj);
    a = [];
    b = [];
    for(i = 0; i < pairs.length; i++) {
        a.push(pairs[i][0]);
        b.push(pairs[i][1]);
    }
    console.log([b, a]);
    return Chance.weighted(b, a);
}

// Begin generation functions

function generateEarthLocation() {
    latitude = 180*Math.random()-90;
    longitude = 360*Math.random()-180;
    latitude = Math.abs(latitude) + "° " + (latitude > 0 ? "N" : "S");
    longitude = Math.abs(longitude) + "° " + (longitude > 0 ? "E" : "W");
    return latitude + ", " + longitude;
}

function generateTimestamp() {
    return new Date().toLocaleString();
}

function generateCoal(ev, w) {
    return {
        displayName: "Coal",
        location: generateEarthLocation(),
        time: generateTimestamp()
    }
}

function generateOil(ev, w) {
    return {
        displayName: "Oil",
        location: generateEarthLocation(),
        time: generateTimestamp()
    }
}

function generateUranium(ev, w) {
    return {
        displayName: "Uranium-235",
        location: generateEarthLocation(),
        time: generateTimestamp()
    }
}

const earthProbTree = {
    0.5: generateCoal,
    0.4: generateOil, 
    0.1: generateUranium,
}

function generateEarth(mineEvent, wallet) {
    return runProbTree(earthProbTree)(mineEvent, wallet);
}

class Generator {
    static async generate(mineEvent, wallet) {
        var final = undefined;

        const location = await DB.getWallet(wallet).then((walletRecords) => {
            if(walletRecords.length == 0) {
                addWallet(wallet, "earth");
                return "earth";
            } else {
                return walletRecords[0].location;
            }
        });
        if(location == "earth") {
            final = generateEarth(mineEvent, wallet);
        } else if(location == "space") {
            // final = generateSpace(...);
        } else {
            console.error("Malformed location: " + location);
        }

        return final;
    }
}

module.exports = Generator;