// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import apiMiddleware from '../middleware/middleware';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(apiMiddleware, thunk, router);

function configureStore() {
  return createStore(rootReducer, [], enhancer);
}

export default { configureStore, history };
