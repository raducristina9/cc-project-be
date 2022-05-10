const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const connection = require("../database");
const { sendMail } = require("../utils/mailFunctions");

router.get("/", (req, res) => {
    connection.query("SELECT * FROM meetinginfo", (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }

        return res.json({
            messages: results,
        });
    });
});

router.post("/info", async (req, res) => {
    const { senderName, senderMail, receiverMail,location,  messageContent, } =
        req.body;

    if (
        !senderName ||
        !senderMail ||
        !receiverMail ||
        !messageContent ||
        !location
    ) {
        return res.status(400).json({
            error: "All fields are required",
        });
    }
try{

    let finalMessage = "Buna, sunt ".concat(senderName).concat("\n Locatia finala este ").
    concat(location).concat("\n Mai voiam sa iti transmit: \n").concat(messageContent)

        sendMail(
            receiverMail,
            senderMail,
            finalMessage,
            `${senderName} Ti-a transmis un mesaj`
        );

        connection.query(
            `INSERT INTO meetinginfo ( 
            senderName,
            senderMail ,
            receiverMail ,
            location ,
            messageContent
            ) values 
            (
            ${mysql.escape( senderName )}, 
            ${mysql.escape(senderMail)},
            ${mysql.escape(receiverMail)},
            ${mysql.escape(location)},
            ${mysql.escape(messageContent)})`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                return res.json({
                    messageContent,
                });
            }
        );}
        catch (err) {
            console.log(err);
            return res.send(err);
        }
    });

module.exports = router;