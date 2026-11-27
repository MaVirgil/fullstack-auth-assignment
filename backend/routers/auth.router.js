import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import authService from '../service/auth.service.js';
import userService from '../service/user.service.js';

const router = Router();

router.post('/api/auth/login', async (req, res) => {
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
  req.session.userId = publicUser.id;

  res.send({
    data: {
      user: publicUser,
    },
  });
});

router.post('/api/auth/register', async (req, res) => {
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
    },
  });
});

router.get('/api/auth/me', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    res.clearCookie('connect.sid');
    return res.status(StatusCodes.UNAUTHORIZED).send({
      error: [
        {
          error: 'no_session',
          description: 'no active session for this request',
        }
      ],
    });
  }

  const user = userService.getById(userId);

  if (!user) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    return res.status(StatusCodes.UNAUTHORIZED).send({
      error: [
        {
          error: 'no_user_found',
          description: 'no user was found for the userId connected to that session',
        },
      ],
    });
  }

  const publicUser = userService.toPublicUser(user);

  res.send({
    data: {
      user: publicUser,
    },
  });
});

router.get('/api/auth/test', (req, res) => {
  res.send({ data: 'ok' });
});

export default router;
