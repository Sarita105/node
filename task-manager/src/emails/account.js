const sgMail = require('@sendgrid/mail');
//const apiKey = 'generatedkey from sendgrid';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sgMail.send({
//     to: 'saritamandal043@gmail.com',
//     from: 'saritamandal043@gmail.com',
//     subject: 'This is my 1st email using node!!',
//     text: 'I hope you get this!!',
// });

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
            to: email,
            from: 'saritamandal043@gmail.com',
            subject: 'Thanks for logging in',
            text: `Welcome ${name}`,
        });
}
const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
            to: email,
            from: 'saritamandal043@gmail.com',
            subject: `Good Bye ${name}`,
            text: 'We regret that you are leaving. We respect your decision. You can provide your feed back or the reason behind leaving. so that we can work on those. Also if you decide to rejoin us you are always welcome. ',
        });
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}