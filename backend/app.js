import express from 'express';
import sessionRouter from './routers/auth.router.js';

const app = express();
app.use(sessionRouter);

app.use(express.static('../frontend/dist'));

app.get('/api/health', (req, res) => {
  res.send({data: 'OK'});
});

app.listen(8080, () => {
  console.log('app listening on port', 8080);
});