import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes';

export const getProfile = (id) => ({
  [RSAA]: {
    endpoint: `${apiConfig.url}/users/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    types: [
      types.GET_PROFILE.REQUEST,
      types.GET_PROFILE.SUCCESS,
      types.GET_PROFILE.FAILURE
    ]
  }
});

export default getProfile;
