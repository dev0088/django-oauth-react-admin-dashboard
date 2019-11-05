import * as types from '../actions/actionTypes';

const initialCalendarEventsState = {
  init: true,
  isFetched: false,
  errorMessage: false,
  isFailure: false,
  value: []
};

export default (state = initialCalendarEventsState, action) => {
  switch (action.type) {
    case types.GET_CALENDAR_EVENTS.REQUEST:
      return Object.assign({}, state, {
        init: false,
        isFetching: true,
        isFetched: false,
        isFailure: false,
        errorMessage: false,
        value: null
      });
    case types.GET_CALENDAR_EVENTS.SUCCESS:
      return Object.assign({}, state, {
        init: false,
        isFetching: false,
        isFetched: true,
        isFailure: false,
        failure: true,
        value: action.payload
      });
    case types.GET_CALENDAR_EVENTS.FAILURE:
      return Object.assign({}, state, {
        init: true,
        isFetching: false,
        isFetched: false,
        isFailure: true,
        errorMessage: action.payload,
        value: null
      });
    default:
      return state;
  }
};
