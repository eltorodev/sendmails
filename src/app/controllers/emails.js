const express = require('express')

const mailer = require('../../modules/mailer')

const router = express.Router()

router.post('/certificates', async (request, response) => {
  try {
    const {emails} = request.body

    emails.forEach(index => {
      mailer.sendMail(
        {
          subject: `COMPRE E RENOVE SEU CERTIFICADO DIGITAL`,
          to: index,
          from: 'contato@inicioassessoria.com.br',
          template: process.env.MAIL_TEMPLATE,
          context: {index},
        },

        error => {
          console.log(error)
          if (error) {
            return response.status(400).json({
              error:
                'Something went wrong while trying to send the certificates email',
            })
          }

          return response.status(200).json({
            message: 'The certificates email was sent successfully',
            data: {index},
          })
        },
      )
    })
    return response.status(200).json({...request.body})
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    })
  }
})

module.exports = app => app.use('/emails', router)
