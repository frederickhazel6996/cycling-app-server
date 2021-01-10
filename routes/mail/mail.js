require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.registerMailer = (message, email) => {
    const msg = {
        to: email,
        from: 'hello@basebike-uk.com',
        subject: 'Welcome To Base Bike',
        text: 'base bike',
        html: `<strong>${message}</strong>`
    };
    sgMail.send(msg, (error, result) => {
        if (error) {
            //console.log(error.response.body);
        } else {
            //console.log(result);
        }
    });
};
exports.resetMailer = (password, email) => {
    const msg = {
        to: email,
        from: 'info@basebike-uk.com',
        subject: 'Password Reset',
        text: 'base bike',
        html: `<strong>${password}</strong>`
    };
    sgMail.send(msg, (error, result) => {
        if (error) {
            //console.log(error.response.body);
        } else {
            //console.log(result);
        }
    });
};
