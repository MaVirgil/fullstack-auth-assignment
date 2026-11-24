import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import authService from '../service/auth.service.js';

const router = Router();

router.post('/api/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const err = await authService.validateLogin(email, password);

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

router.post('/api/register', async (req, res) => {
  const newUser = {};

  newUser.email = req.body.email;
  newUser.password = req.body.password;
  newUser.firstName = req.body.firstName;

  console.log('creating new user:', JSON.stringify(newUser));
  const { created, error } = await authService.register(newUser);

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: error,
    });
    return;
  }

  res.send({user: created})
});

export default router;