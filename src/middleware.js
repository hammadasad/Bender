import { log } from './utils';
import routes from './routes';
import bodyParser from 'body-parser';

// Application Middleware
export default function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Routes
  app.use(routes);

  // If there's a 404
  app.use((req, res) => {
    res.status(404).send({
      status: 404,
      message: 'resource not found',
    });
  });

  // Any 500 errors
  app.use((err, req, res) => {
    log.error(err.stack);
    const message = process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.stack;
    res.status(500).send({
      status: 500,
      message,
    });
  });
}
