const Stripe = require('stripe')(process.env.SECKRET_KEY_STRIPE);

class PaymentController {
    async SendPayment (req, res) {
        let {amount, receipt_email, id, itemName, itemPrice, recipientName, phoneNumber, street, suite, city, state, country, postalCode} = req.body;
        try {
            await Stripe.paymentIntents.create({
               amount: amount,
               currency: "USD",
               description: `Payment for ${itemName} $${itemPrice}`,
               payment_method: id,
               confirm: true,
               receipt_email: receipt_email,
               shipping: {
                   name: recipientName,
                   phone: phoneNumber,
                   address: {
                       line1: street,
                       line2: suite,
                       city: city,
                       state: state,
                       country: country,
                       postal_code: postalCode
                   }
               }
           })
           res.json({
               message: "Payment successfull",
               success: true
           })
       }
       catch(error) {
           console.log("Error ", error);
           res.json({
               message: "Payment failed",
               success: false
           })
       }
    }
}

module.exports = new PaymentController();