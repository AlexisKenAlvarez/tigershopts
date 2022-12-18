const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = class Email {
    constructor(email, url) {
        this.to = email
        this.url = url
        this.fromEmail = 'alexisken.alvarez@cvsu.edu.ph',
        this.fromName = 'Tigershop'
    }

    async sendMagicLink() {
        const mailOptions = {
            to: this.to,
            from: {
                email: this.fromEmail,
                name: this.fromName
            },
            templateId: 'd-de11d95d8927429cb971abd241f6317e',
            dynamic_template_data: {
                url: this.url
            }
        }

        await sgMail.send(mailOptions).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }


}

