import crypto from 'crypto';
import { Session } from '../models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';

export const createSession = async (userId) => {
  const now = Date.now();

  const accessToken = crypto.randomBytes(24).toString('hex');
  const refreshToken = crypto.randomBytes(32).toString('hex');

  const session = await Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(now + ONE_DAY),
  });

  return session;
};

export const setSessionCookies = (res, session) => {
  const cookieOptsAccess = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: FIFTEEN_MINUTES,
  };
  const cookieOptsRefresh = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  };

  res.cookie('accessToken', session.accessToken, cookieOptsAccess);
  res.cookie('refreshToken', session.refreshToken, cookieOptsRefresh);
  res.cookie('sessionId', String(session._id), cookieOptsRefresh);
};
