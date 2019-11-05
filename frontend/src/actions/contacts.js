import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes';

export const getContacts = () => {
  return {
    [RSAA]: {
      endpoint: `${apiConfig.url}/api/v1/contacts`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      types: [
        types.GET_CONTACTS.REQUEST,
        types.GET_CONTACTS.SUCCESS,
        types.GET_CONTACTS.FAILURE
      ]
    }
  };
};

export default getContacts;
