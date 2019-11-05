import * as types from '../actions/actionTypes';
import defaultContacts from '../constants/contacts';

const initialContactsState = {
  init: true,
  isFetched: false,
  errorMessage: false,
  isFailure: false,
  value: defaultContacts
};

export default (state = initialContactsState, action) => {
  switch (action.type) {
    case types.GET_CONTACTS.REQUEST:
      return Object.assign({}, state, {
        init: false,
        isFetching: true,
        isFetched: false,
        isFailure: false,
        errorMessage: false,
        value: null
      });
    case types.GET_CONTACTS.SUCCESS:
      return Object.assign({}, state, {
        init: false,
        isFetching: false,
        isFetched: true,
        isFailure: false,
        failure: true,
        value: action.payload
      });
    case types.GET_CONTACTS.FAILURE:
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
