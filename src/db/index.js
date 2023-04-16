const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../secrets/.env') })

async function connect(){
    mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    mongoose.connection
    .once('open',()=> console.log('Database has been connected !!!'))
    .on('error',(error)=>{
        console.log("Can not connect to Database !!!\n", error)
    })
    }

module.exports = { connect }