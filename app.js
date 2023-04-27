const express = require('express')
const { connectToDb, getDb } = require('./db')
const utilsSchedule = require('./utils/schedule.js');
require('dotenv').config()

// init app
const app = express()
app.use(express.json())

// database connection
let db

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3000')
        })

        db = getDb()

        const writeToDb = (day, channelId) => {
            utilsSchedule(day, channelId, (error, data) => {
                if (error) {
                    console.log('Error 1: ', error)
                } else {
                    //console.log(JSON.stringify(data))
                    db.collection('epg ' + channelId).insertMany(data)
                        .then(() => {
                            console.log('Data successfully inserted into MongoDB')
                        })
                        .catch((err) => {
                            console.log('Error inserting data into MongoDB:', err)
                        })
                }
            })
        } 
        writeToDb(0, 0)
        writeToDb(1, 0)
        writeToDb(2, 0)
        
    } else {
        console.log('Error connecting to database:', err)
    }
})