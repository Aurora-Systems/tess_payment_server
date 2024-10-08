// import files
require('dotenv').config()
const express = require("express")
const eco = require("./payment_types/ecocash")


// declare express server
const app = express()
const port = process.env.PORT

app.get('/',(req,res)=>{
    res.send('<a href="https://bleu.aurorasystems.co.zw">Bleu Finance Payment Solutions</a>')
})

/**
 * Endpoint which handles payments process and sends a success or fail status
 * @constructor 
 * @param  {string} req - request data
 */ 
app.get('/payments/intiate_payment/ecocash', (req,res)=>{
    
})

app.listen(port,()=>{
    console.log(`Server is running and listening on port ${port}`)
})

