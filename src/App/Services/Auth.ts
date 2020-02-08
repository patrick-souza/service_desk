import jwt from 'jsonwebtoken';
import { IUser } from 'App/Redux/modules/Auth';

const secret = 'MYSECRET';

type IToken = {
  data: {
    auth: boolean;
    code: string;
    message: string;
    user: IUser;
  };
  iat: number;
  exp: number;
};

const decryptToken = (encryptToken: string): IToken => {
  const token = jwt.verify(encryptToken, secret) as IToken;

  return token;
};

const getUserInToken = (token: string): IUser => {
  const {
    data: { user },
  } = decryptToken(token);

  return user;
};
export default getUserInToken;
