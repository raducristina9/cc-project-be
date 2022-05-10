const sgMail = require('@sendgrid/mail');
const dotenv = require("dotenv");

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (receiver, sender, message, subject) => {
    const messageToSend = {
        to: receiver,
        from: sender,
        subject: subject,
        text: message,
    };

    sgMail
        .send(messageToSend)
        .then((response) => {
            console.log(response);
            return 200;
        })
        .catch((error) => {
            console.log(error);
            return 500;
        });
}

module.exports = {
    sendMail
}