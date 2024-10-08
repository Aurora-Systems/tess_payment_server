const {Paynow} = require("paynow");

const integration_id = process.env.INTEGRATION_ID
const integration_key = process.env.INTEGRATION_KEY
/** 
 * Paynow payment intiated function accepts to item 
 * @param {string} integration_id - Merchant ID 
 * @param {string} integration_key - Merchant API KEY 
 */

const paynow =  new Paynow(integration_id,integration_key)

module.exports = paynow;
