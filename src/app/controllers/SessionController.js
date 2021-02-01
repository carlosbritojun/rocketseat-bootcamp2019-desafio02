import jwt from 'jsonwebtoken';

import { StatusCodes } from 'http-status-codes';
import authConfig from '../../config/auth';
import sessionStoreSchema from '../validations/sessionStoreSchema';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    try {
      await sessionStoreSchema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(StatusCodes.BAD_GATEWAY).json({
        error: 'Validation fails',
        messages: err.errors,
      });
    }

    const { email, password } = req.body;

    const user = await User.findByPk(1);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
