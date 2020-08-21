const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const emailTemplate = require('../services/emailTemplates/emailTemplate');

const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const Survey = mongoose.model('Survey');

module.exports = (app) => {
  app.get('/api/surveys/:surveyId/:response/thanks', (req, res) => {
    const { response } = req.params;
    res.send(`Gracias por el ${response === 'yes' ? 'si' : 'no'} carepicha!`);
  });

  //Devuelve las surveys del usuario logeado(no se incluye los recipients)
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user }).select({
      recipients: false,
    });
    res.status(200).send(surveys);
  });

  //Webhook para devolver datos cuando usuario hace click en si/no
  //en el link del survey.

  app.post('/api/surveys/webhooks', (req, res) => {
    //Mapea el re.body que trae todos los events
    //Luego separa el url y saca el surveyId y el response
    //Al final devuelve un objeto con email,surveyId,choice(si/no)

    //Separar los events undefined de los existentes(compact())

    //Quitar events repetidos en este caso por email y surveyId(uniqBy('email', 'surveyId'))

    //Actualizar Survey model

    //Al final devolver valores unicos

    _.chain(req.body)
      .map((event) => {
        const pathName = new URL(event.url).pathname;
        const p = new Path('/api/surveys/:surveyId/:response/thanks');
        const match = p.test(pathName);
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.response,
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: { $elemMatch: { email: email, responded: false } },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  //Maneja todo al momento de enviar los emails
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients, from } = req.body;
    const survey = new Survey({
      title,
      body,
      subject,
      from,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })), //Separar emails con comas y quitar espacios
      _user: req.user.id,
      dateSent: Date.now(),
    });

    //Envio de emails
    const mailer = new Mailer(survey, emailTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      //Rebajar un credito despues de mandar email
      req.user.credits -= 1;
      //Guardar usuario con creditos actualizados
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete(
    '/api/surveys/delete/:surveyId',
    requireLogin,
    async (req, res) => {
      const surveyId = req.params.surveyId;
      console.log(surveyId);
      await Survey.findByIdAndDelete({ _id: surveyId });
      res.send({});
    }
  );
};
