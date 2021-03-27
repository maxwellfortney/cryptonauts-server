const Mongoose = require('mongoose');

const db = Mongoose.connect('mongodb://localhost/tokens', { useNewUrlParser: true, useUnifiedTopology: true }).connection;

db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function() {
    console.log("Database connection established.")
});

const tokenSchema = new Mongoose.Schema({
    minedBy: String, // miner address
    type: String,
    tokenID: Number;
    data: Object
});

const tokenRecord = Mongoose.model("tokenRecord", tokenSchema);

class TokenDB {
    static addToken(minedBy, type, data, callback) {
        new tokenRecord({
            minedBy: minedBy,
            type: type,
            tokenID: Number,
            data: data
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
}

module.exports = TokenDB;