const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const RECEIVED = 'RECEIVED';
const INIT = 'INIT';

const createRequestTypes = base => {
  const res = {};
  const subTypes = [REQUEST, SUCCESS, FAILURE, RECEIVED, INIT];
  subTypes.forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
};

export const LOGIN = createRequestTypes('@@jwt/LOGIN');
export const TOKEN = createRequestTypes('@@jwt/TOKEN');
export const REGISTER = createRequestTypes('@@jwt/REGISTER');
export const LOGOUT = createRequestTypes('@@jwt/LOGOUT');
export const GET_PROFILE = createRequestTypes('@@jwt/GET_PROFILE');
export const GET_CONTACTS = createRequestTypes('@@jwt/GET_CONTACTS');
export const GET_CALENDAR_EVENTS = createRequestTypes('@@jwt/GET_CALENDAR_EVENTS');
