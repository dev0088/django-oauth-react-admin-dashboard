import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes';
import { getSessionCsrf } from '../utils/djangoSession';

export const getCalendarEvents = () => {
  return {
    [RSAA]: {
      endpoint: `${apiConfig.url}/calendars/events/`,
      method: 'GET',
      headers: {
        'X-CSRFToken': getSessionCsrf(),
        'Content-Type': 'application/json'
      },
      types: [
        types.GET_CALENDAR_EVENTS.REQUEST,
        types.GET_CALENDAR_EVENTS.SUCCESS,
        types.GET_CALENDAR_EVENTS.FAILURE
      ]
    }
  };
};

export default getCalendarEvents;
