import './lib/env.js';
import path from 'node:path';
import express from 'express';
import session from 'express-session';
import authRouter from './routers/auth.router.js';

const PORT = Number(process.env.PORT) || 8080;
const MODE = process.env.MODE || 'dev';
const DIST_PATH = path.resolve(
  import.meta.dirname,
  '../frontend/dist',
);

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(express.static(DIST_PATH));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: MODE === 'prod' },
  }),
);

app.use(authRouter);

app.get('/api/health', (req, res) => {
  res.send({ data: 'OK' });
});

/********************************
 * FALLBACKS FOR UNKNOWN ROUTES *
 ********************************/

// any request to a non-existing API-route should not return index.html
app.use('/api', (req, res) =>
  res.status(404).send({
    error: 'not_found',
    description: `'${req.method} ${req.path}' is not a valid route`,
  }),
);

// serve index.html on any request to a non-API route
app.get('/{*splat}', (req, res) => {
  res.sendFile(DIST_PATH + '/index.html');
});

app.listen(PORT, () => {
  console.log('app listening on port', PORT);
});
