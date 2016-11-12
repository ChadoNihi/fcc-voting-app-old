var mongo = require("mongodb").MongoClient;

module.exports.connect = function connect(callback) {
    mongo.connect(process.env.MONGO_URI, function(err, conn){
        /* exports the connection */
        module.exports.db = conn;
        callback(err);
    });
};
