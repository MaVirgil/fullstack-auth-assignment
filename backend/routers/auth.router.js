import { Router } from 'express';
import session from 'express-session';
import { StatusCodes } from 'http-status-codes';
import authService from '../service/auth.service.js';
import userService from '../service/user.service.js';

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


  const publicUser = userService.toPublicUser(user);

  console.log('adding public user to session:', publicUser);

  req.session.user = publicUser;
  
  res.send({
    data: {
      user: publicUser,
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

  const publicUser = userService.toPublicUser(user);
  
  res.send({
    data: {
      created: publicUser,
    }
  });
});

router.get('/api/auth/test', (req, res) => {
  res.send({ data: 'ok' });
});

export default router;
