import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes';

export const login = (email, password) => {
  return {
    [RSAA]: {
      endpoint: `${apiConfig.url}/api/v1/login/`,
      method: 'POST',
      body: JSON.stringify({ email, password, username: email }),
      headers: { 'Content-Type': 'application/json' },
      types: [types.LOGIN.REQUEST, types.LOGIN.SUCCESS, types.LOGIN.FAILURE]
    }
  };
};

export const logout = token => ({
  [RSAA]: {
    endpoint: `${apiConfig.url}/api/v1/logout/`,
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    types: [types.LOGOUT.REQUEST, types.LOGOUT.SUCCESS, types.LOGOUT.FAILURE]
  }
});

export const refreshAccessToken = token => ({
  [RSAA]: {
    endpoint: `{$apiConfig.url}/auth/token/refresh/`,
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: { 'Content-Type': 'application/json' },
    types: [types.TOKEN.REQUEST, types.TOKEN.RECEIVED, types.TOKEN.FAILURE]
  }
});
