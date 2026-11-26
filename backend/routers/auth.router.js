import { Router } from 'express';
import session from 'express-session';
import { StatusCodes } from 'http-status-codes';
import authService from '../service/auth.service.js';

const router = Router();

router.post('/api/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { user, error } = await authService.login(email, password);

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error,
    });
    return;
  }

  req.session.user = user;

  // TODO: strip id and passwordHash from user before sending to client
  
  res.send({
    data: {
      user,
    },
  });
});


router.post('/api/register', async (req, res) => {
  const newUser = {};
  
  newUser.email = req.body.email;
  newUser.password = req.body.password;
  newUser.firstName = req.body.firstName;
  
  const { user, error } = await authService.register(newUser);
  
  if (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: error,
    });
    return;
  }

  // TODO: strip id and passwordHash from user before sending to client
  
  res.send({
    data: {
      created: user,
    }
  });
});

router.get('/api/auth/test', (req, res) => {
  res.send({ data: 'ok' });
});

export default router;
