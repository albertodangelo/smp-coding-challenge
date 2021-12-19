import jwt from 'jsonwebtoken';
import User from '../types/users';

const signToken = (user: User) => {
  return jwt.sign({ email: user.email }, 'secret', {
    expiresIn: '30d',
  });
};

export default signToken;
