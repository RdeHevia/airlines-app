import { getAllRoutes } from '../services/routesAPI';

// ACTION CREATORS
export const initializeRoutes = () => {
  return {
    type: 'INIT_ROUTES',
    data: getAllRoutes(),
  }
}

// REDUCER
export const routeReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ROUTES':
      return action.data;

    case 'FILTER':
      const { airlineId, airportCode } = action.data;
      return state.map(route => {
        if (
          (route.airline === airlineId || airlineId === "all") &&
          (route.src === airportCode || route.dest === airportCode || airportCode === "all")
        ) {
          return {...route, display: true};
        } else {
          return {...route, display: false};
        }
      })
    default:
      return state;
  }
}