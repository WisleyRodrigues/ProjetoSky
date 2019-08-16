const helmet = require('helmet');
const express = require('express');
const debug = require('debug')('APP');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const compression = require('compression');
const bearerToken = require('express-bearer-token');
 
require('dotenv').config();

const {port} = require('./config')
const errorHandler = require('./handlers/error');
const notFoundHandler = require('./handlers/notFound');

const app = express();

const indexRoute = require('./routes')();
const oauthRoute = require('./routes/oauth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(errors());

app.use('/oauth', oauthRoute);

app.use(bearerToken());
app.use('/', indexRoute);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  debug(`Servidor inciado na porta ${port}!`);
});
