import Express from 'express';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as OpenApiValidator from 'express-openapi-validator';
import errorHandler from './api/middlewares/error.handler';
import emailConstaintErrorHandler from './api/middlewares/email.constraint.handler';
import routes from './routes';

const app = new Express();

const root = path.normalize(`${__dirname}/..`);

const apiSpec = path.join(__dirname, 'api', 'api.yml');
const validateResponses = !!(
  process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
  process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
);

app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '100kb',
  })
);
app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(Express.static(`${root}/public`));

app.use(process.env.OPENAPI_SPEC || '/spec', Express.static(apiSpec));
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateResponses,
    ignorePaths: /.*\/spec(\/|$)/,
  })
);

routes(app);
app.use(emailConstaintErrorHandler);
app.use(errorHandler);

export default app;
