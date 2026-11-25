import './lib/env.js';
import express from 'express';
import session from 'express-session';
import sessionRouter from './routers/auth.router.js';

const PORT = Number(process.env.PORT) || 8080;
const MODE = process.env.MODE || 'dev';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(express.static('../frontend/dist'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: MODE === 'prod' }
  }),
);

app.use(sessionRouter);

app.get('/api/health', (req, res) => {
  res.send({ data: 'OK' });
});

app.listen(PORT, () => {
  console.log('app listening on port', PORT);
});
