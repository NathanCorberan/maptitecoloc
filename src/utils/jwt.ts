import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';

export const generateAccessToken = (user: any) => {
  return jwt.sign({ id: user._id, email: user.email }, ACCESS_TOKEN_SECRET, {
    expiresIn: '10m',
  });
};

export const generateRefreshToken = (user: { id: number; email: string }) => {
  return jwt.sign(
    { id: user.id, email: user.email }, // Ajoutez 'id' et 'email' au payload
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

export const generateAccessTokenId = (user: { _id: number; email: string }) => {
  return jwt.sign(
    { id: user._id, email: user.email }, // Inclut l'ID et l'email dans le payload
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: '10m', // Durée de validité de l'access token
    }
  );
};
