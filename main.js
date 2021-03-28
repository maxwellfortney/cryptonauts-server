const Generator = require('./generate.js');
const OurContract = require('./contract.js');
const DB = require('./db.js');

OurContract.registerMineEventHandler(async function(err, mineEvent) {
    if(err) {
        console.error(err);
        return;
    }

    newTokenData = Generator.generate(mineEvent)

    newTokenData.then((x) => {
        console.log("==< New Token Mined >==");
        console.log(x);
        console.log("=======================");
    });

    OurContract.getTxn(mineEvent.transactionHash).then(function(txn) {
        DB.addToken(txn.from, newTokenData.type, mineEvent.returnValues._tokenId, newTokenData, function(record) {
            // notify frontend here
        });
    });
});