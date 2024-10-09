// import files
require('dotenv').config()
const express = require("express")
const MobileMoney = require("./payment_types/mobile_money")


// declare express server
const app = express()
const port = process.env.PORT

app.get('/',(req,res)=>{
    res.send('<a href="https://bleu.aurorasystems.co.zw">Bleu Finance Payment Solutions</a>')
})

app.post('/payments/intiate_payment/mobile', (req,res)=>{
    const intiate_payment = MobileMoney(res.items,res.mobile_number, res.payment_method)
    res.send(intiate_payment)
})

app.listen(port,()=>{
    console.log(`Server is running and listening on port ${port}`)
})

