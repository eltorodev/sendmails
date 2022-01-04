const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
  secure: process.env.MAIL_SECURE,
  host: process.env.MAIL_HOSTNAME,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: './src/resources/mail/certificates/',
    layoutsDir: './src/resources/mail/certificates/',
    defaultLayout: 'index.html',
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
};

transport.use('compile', handlebars(handlebarOptions));

module.exports = transport;
