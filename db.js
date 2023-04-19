const { MongoClient } = require('mongodb')
require('dotenv').config()


let dbConnection
const uri = process.env.MONGO_DB_URL

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db()
            return callback()
        })
        .catch(err => {
            console.log(err)
            return callback(err)
        })
    },
    getDb: () => dbConnection
}