// import files
require('dotenv').config()
const cors = require("cors")
const express = require("express")
const serverless = require("serverless-http")
const MobileMoney = require("./payment_types/mobile_money")
const CheckStatus = require("./check_poll_result")


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

route.post('/payments/initiate_payment/mobile/', async(req,res)=>{
    const {items,mobile_number, payment_method} = req.body;
    // res.send(items)
    const initiate_payment =  await MobileMoney(items,mobile_number,payment_method)
    res.send(initiate_payment)
})

route.post('/payments/check_status', async(req,res)=>{
    const {poll_url} = req.body;
    const result = CheckStatus(poll_url)
    res.send(result)

})


app.use('/.netlify/functions/api',route)
module.exports.handler = serverless(app)