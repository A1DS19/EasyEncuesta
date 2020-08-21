const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const app = express();
const PORT = process.env.PORT || 5000;

//mongoDB/Database
require('./config/db');
require('./models/User');
require('./models/Survey');

//Middleware
app.use(bodyParser.json());

//services
require('./services/passport');
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//Production deploy
if (process.env.NODE_ENV === 'production') {
  // Express carga production assets
  app.use(express.static('client/build'));
  //Express va a dar el index.html cuando no sepa la ruta
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`SERVER INICIADO\nPUERTO:${PORT}`));
