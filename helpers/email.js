const nodemailer = require('nodemailer')


const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "475702aa840e74",
        pass: "5e23c8b21d4342"
    }
});


module.exports = transport
