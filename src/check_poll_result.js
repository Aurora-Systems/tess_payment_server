const paynow = require("./paynow")

/**
* @param {string} poll_url - Transaction poll url
*/
const check_transaction=async(poll_url)=>{
    const status = await paynow.pollTransaction(poll_url)
    return status
}

module.exports = check_transaction;