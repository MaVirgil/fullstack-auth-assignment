import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import authService from '../service/auth.service.js';

const router = Router();

router.post('/api/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const err = authService.validateLogin(username, password);

  if (err) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: err,
    });
    return;
  }

  res.send({data: 'logged in'});

});

router.get('/api/auth/test', (req, res) => {
  res.send({data: "ok"});
});

export default router;