require('dotenv').config();
const Sentry = require('@sentry/node');
const app = require('./server');

// ****************** SENTRY *************************

// Sentry.init({ dsn: `${process.env.SENTRY_DSN}` });

// ****************** PORT SET UP *************************

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Ayyyyy ${PORT} is up baby!`);
});
