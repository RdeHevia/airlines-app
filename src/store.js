import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { airlineReducer } from './reducers/airlineReducer';
import { airportReducer } from './reducers/airportReducer';
import { routeReducer } from './reducers/routeReducer';
import { filterReducer } from './reducers/filterReducer';

const reducer = combineReducers({
  routes: routeReducer,
  airlines: airlineReducer,
  airports: airportReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;