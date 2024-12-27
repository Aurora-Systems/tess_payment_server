// import files
require('dotenv').config()
const cors = require("cors")
const express = require("express")
const serverless = require("serverless-http")
const CheckStatus = require("./check_poll_result")
const InitializeTransaction = require("./process_payment")


// declare express server
const app = express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

const route = express.Router(); 

route.get('/',(req,res)=>{
    res.send('<a href="https://bleu.aurorasystems.co.zw">Bleu Finance Payment Solutions</a>')
})

route.post('/payments/initiate_transaction', async(req,res)=>{
    const data = req.body;
    // res.send(items)
    const initiate_payment =  await InitializeTransaction(data)
    res.send(initiate_payment)
})

route.post('/payments/check_status', async(req,res)=>{
    const {poll_url} = req.body;
    const result = await CheckStatus(poll_url)
    res.send(result)

})


app.use('/.netlify/functions/api',route)
module.exports.handler = serverless(app)