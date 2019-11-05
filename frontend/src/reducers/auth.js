import * as types from '../actions/actionTypes';

const initialState = {
  access: false,
  errors: false,
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN.REQUEST:
      return {
        access: {},
        errors: false,
        isAuthenticated: false
      };
    case types.LOGIN.SUCCESS:
      return {
        access: {
          token: action.payload.token
        },
        errors: false,
        isAuthenticated: true
      };
    // setAuth(auth);
    case types.TOKEN.RECEIVED:
      return {
        ...state,
        access: {
          token: action.payload.token
        }
      };
    case types.LOGIN.FAILURE:
    case types.TOKEN.FAILURE:
      return {
        access: {},
        errors: action.payload.response || {
          non_field_errors: action.payload.statusText
        },
        isAuthenticated: false
      };
    case types.LOGOUT.REQUEST:
    case types.LOGOUT.SUCCESS:
      return {
        access: {},
        errors: false,
        isAuthenticated: false
      };
    case types.LOGOUT.FAILURE:
      return {
        access: {},
        isAuthenticated: false,
        errors: action.payload.response || {
          non_field_errors: action.payload.statusText
        }
      };
    default:
      return state;
  }
};

export function accessToken(state) {
  if (state.access) {
    return state.access.token;
  }
}

export function isAccessTokenExpired(state) {
  if (state.access && state.access.exp) {
    return 1000 * state.access.exp - new Date().getTime() < 5000;
  }
  return true;
}

export function refreshToken(state) {
  if (state.refresh) {
    return state.refresh.token;
  }
}

export function isAuthenticated(state) {
  return state.access.token != null;
}

export function errors(state) {
  return state.errors;
}
