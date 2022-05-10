const express = require('express');
const router = express.Router();
const { sendMail } = require('../utils/mailFunctions')

router.post("/send", (req, res) => {
    const { senderName, senderMail, receiverMail, messageContent, location} = req.body;
    if (!senderName || !senderMail || !receiverMail || !messageContent || !location) {
        return res.status(400).send("Missing Parametres");
    }

    sendMail(receiverMail, senderMail, messageContent, `${senderName} has sent you a message`);
    res.send(200);
})

module.exports = router;

