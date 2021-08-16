import data from '../data.js'

// ACTION CREATORS
export const initializeRoutes = () => {
  return {
    type: 'INIT_ROUTES',
    data: data.routes
  }
}

// REDUCER
export const routeReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'INIT_ROUTES':
      return action.data;
    default:
      return state;
  }
}