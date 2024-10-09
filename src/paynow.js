const {Paynow} = require("paynow");

const integration_id = process.env.INTEGRATION_ID
const integration_key = process.env.INTEGRATION_KEY
/** 
 * Paynow payment intiated function accepts to item 
 * @param {string} integration_id - Merchant ID 
 * @param {string} integration_key - Merchant API KEY 
 */

const paynow =  new Paynow(integration_id,integration_key)
paynow.resultUrl = "http://example.com/gateways/paynow/update"
paynow.returnUrl = "http://example.com/return?gateway=paynow&merchantReference=1234"

module.exports = paynow;
