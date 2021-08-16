import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routeReducer } from './reducers/routeReducer';

const reducer = combineReducers({
  routes: routeReducer,
});

const store = createStore(reducer, composeWithDevTools());
console.log('test');
export default store;