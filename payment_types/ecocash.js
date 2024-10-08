const paynow = require("../paynow")
const rp = require("../components")
const moment = require("moment")
/**
 * Ecocash payment handler
 * @param {{"item", "quantity":number, "unit_charge":number}[]} req - request data
 * 
 */
const Ecocash=async(req)=>{
    const invoice_number = moment().valueOf()
    const payment = paynow.createPayment(`Invoice ${invoice_number}`)
    req.forEach(i => {
        Array.from({length:i.quantity}).forEach(e=>{
            payment.add(i.item,i.unit_charge)
        })
        
    });

    console.log(payment.total())
}

module.exports  = Ecocash;