const nodeMailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: process.env.SMTM_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(email, activateLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Активация аккаунта на React Sneakers",
      text: "",
      html: `
          <div>
            <h1>
              Для активации перейдите по ссылке
            </h1>
            <a href="${activateLink}">${activateLink}</a>
          </div>
        `,
    });
  }
}

module.exports = new MailService();
