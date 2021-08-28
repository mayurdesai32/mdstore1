const sgMail = require('@sendgrid/mail');

const sendEmail = (options) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: options.email,
    from: process.env.EMAIL_FROM, // Use the email address or domain you verified above
    subject: options.subject,
    text: 'and easy to do anywhere, even with Node.js',
    html: options.message,
  };

  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
};

module.exports = sendEmail;
