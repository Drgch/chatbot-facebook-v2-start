const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENGRID_API_KEY)

const SendWelcomeEmail = (email,name)=> {
    sgMail.send({
        to: email,
        from:  'drgch60@gmail.com',
        subject: 'Thanks for Joining App',
        text: `Welcome to the app, ${name}.  Let me know how if goes.`
    })
}

const SendDeleteEmail = (email,name)=> {
    sgMail.send({
        to: email,
        from:  'drgch60@gmail.com',
        subject: 'Sorry to See You Go',
        text: `Thank you for using our app, ${name}.  If there is anything we could have done better please let us know.`
    })
}

module.exports = {
    SendWelcomeEmail,
    SendDeleteEmail
}