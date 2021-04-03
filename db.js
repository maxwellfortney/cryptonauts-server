const Mongoose = require('mongoose');

const conn = Mongoose.connect('mongodb://localhost/tokens', { useNewUrlParser: true, useUnifiedTopology: true });

const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Database connection established.")
});

const tokenSchema = new Mongoose.Schema({
    minedBy: String, // miner address
    type: String,
    tokenID: Number,
    data: Object,
    render: String
});

const tokenRecord = Mongoose.model("tokenRecord", tokenSchema);

const walletSchema = new Mongoose.Schema({
    id: String, 
    location: String // "earth" | "space"
});

const walletRecord = Mongoose.model("walletRecord", walletSchema);

class DB {
    static addToken(minedBy, type, tokenID, location, data, callback) {
        new tokenRecord({
            minedBy: minedBy,
            type: type,
            tokenID: tokenID,
            location: location,
            data: data,
            render: ""
        }).save(function(err, record) {
            if(err) return console.error(err);
            callback(record);
        });
    }
    static async getToken(tokenID) {
        return await tokenRecord.find({ tokenID: tokenID }, function(err, record) {
            console.error(err);
        });
    }

    static addWallet(wallet, location, callback) {
        new walletRecord({
            id: wallet,
            location: location
        }).save(function(err, wallet) {
            if(err) return console.error(err);
            callback(wallet);
        });
    }
    static async getWallet(id) {
        return await walletRecord.find({ id: id }, function(err, record) {
            console.error(err);
        });
    }
}

module.exports = DB;