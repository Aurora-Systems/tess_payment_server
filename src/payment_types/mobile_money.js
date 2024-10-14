require('dotenv').config()
const paynow = require("../paynow")
const moment = require("moment")
/**
 * Ecocash payment handler
 * @param {{"item", "quantity":number, "unit_charge":number}[]} items - request data
 * @param {string} mobile_number - Ecocash number
 * @param {"ecocash"|"onemoney"} payment_method - Mobile payment provider to be used
 * @returns {{"data":null|any, "error":null|any}}
 */
async function MobileMoney(items, mobile_number, payment_method){
    const user_email = process.env.USER_EMAIL
    const invoice_number = moment().valueOf()
    const payment = paynow.createPayment(`Invoice ${invoice_number}`, user_email)
    items.forEach(i => {
        Array.from({length:i.quantity}).forEach(e=>{
            payment.add(i.item,i.unit_charge)
        })
        
    });
    try{
        const response = await paynow.sendMobile(payment, mobile_number, payment_method)
        if(response && response.success){
           let pollUrl = response.pollUrl
           return({data:{pollUrl}, error:null})
        }else{
            throw response
        }
    }catch(err){
        return({data:null, error:err.message})
    }
}

module.exports  = MobileMoney;