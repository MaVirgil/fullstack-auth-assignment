import './lib/env.js';
import express from 'express';
import sessionRouter from './routers/auth.router.js';

const app = express();
app.disable('x-powered-by');

const PORT = Number(process.env.PORT) || 8080;

app.use(express.json());
app.use(express.static('../frontend/dist'));
app.use(sessionRouter);

app.get('/api/health', (req, res) => {
  res.send({ data: 'OK' });
});

app.listen(PORT, () => {
  console.log('app listening on port', PORT);
});
