const mongoose = require('mongoose')

const mongoDB = () => {
    try{
        mongoose.connect(process.env.MONGODB_URI, {
            tls: true,
            tlsAllowInvalidCertificates: true,
            serverSelectionTimeoutMS: 1000
        })

        console.log('Database Connected')
    }catch(err){
        console.log('Database error', err)
    }
}

module.exports = mongoDB;