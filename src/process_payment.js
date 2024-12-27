const Database = require("./init_supabase.js");
const Pay = require("./paynow.js");

/**
 * @typedef {Object} Products
 * @param {number} Products.unit_charge
 * @param {string} Products.product_item
 **/

/**
 * @typedef {Object} request_data
 * @param {string} request_data.store_id
 * @param {string} request_data.full_name
 * @param {string} request_data.contact_number
 * @param {string} request_data.email
 * @param {Products[]} request_data.cart
 *
 */
const InitializeTransaction = async (request_data) => {
    const transaction_number = `${new Date().valueOf()}`;
    const payment = await Pay.createPayment(transaction_number);
    request_data.cart.forEach((items) => {
        payment.add(items.product_item, items.unit_charge);
    });
    const send_payment = await Pay.send(payment);
    console.log(`Payment went ${JSON.stringify(send_payment)}`);
    if (send_payment.success) {
        const transaction_data = {
            ...request_data,
            invoice_number: transaction_number,
            payment_url: send_payment.redirectUrl,
            poll_url: send_payment.pollUrl,
            payment_status: "not_paid",
        };
        const save_transaction =
            await Database.from("transactions").insert(transaction_data);
        if (save_transaction.error !== null) {
            console.log(save_transaction);
            return { error: "Failed to save transaction" };
        }

        return {
            payment_url: send_payment.redirectUrl,
            poll_url: send_payment.pollUrl,
            invoice_number: transaction_number,
        };
    } else {
        return { error: "Failed to create transaction" };
    }
};

module.exports = InitializeTransaction;