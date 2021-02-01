import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Token not provided' });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Token invalid' });
  }
};
