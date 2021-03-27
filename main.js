const Generator = require('./generate.js');
const OurContract = require('./contract.js');
const TokenDB = require('./db.js');

OurContract.registerMineEventHandler(async function(err, mineEvent) {
    if(err) {
        console.error(err);
        return;
    }

    newTokenData = Generator.generate(mineEvent);

    OurContract.getTxn(mineEvent.transactionHash).then(function(from) {
        TokenDB.addToken(from, newTokenData.type, newTokenData, function(record) {
            // notify frontend here
        });
    });
});