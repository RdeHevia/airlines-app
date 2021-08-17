import { getAllRoutes } from '../services/routesAPI';

// ACTION CREATORS
export const initializeRoutes = () => {
  return {
    type: 'INIT_ROUTES',
    data: getAllRoutes(),
  }
}

export const nextPage = () => {
  return {
    type: 'NEXT_PAGE',
  }
}
export const previousPage = () => {
  return {
    type: 'PREVIOUS_PAGE',
  }
}

// REDUCER
export const routeReducer = (
  state = {
    all: [],
    filteredRoutesIndexes: [],
    displayRange: [0, 25]
  },
  action
  ) => {
  switch (action.type) {
    case 'INIT_ROUTES': {
      const filteredRoutesIndexes = action.data.map((_, idx) => idx);
      const sliceStart = 0;
      const sliceEnd =
        25 > filteredRoutesIndexes.length ? filteredRoutesIndexes.length : 25;
      return {
        all: action.data,
        filteredRoutesIndexes,
        displayRange: [sliceStart, sliceEnd]
      };
    }
    case 'FILTER': {
      const { airlineId, airportCode } = action.data;
      const routes = state.all;

      const updatedRoutes = routes.map(route => {
        if (
          (route.airline === airlineId || airlineId === "all") &&
          (route.src === airportCode || route.dest === airportCode || airportCode === "all")
        ) {
          return {...route, display: true};
        } else {
          return {...route, display: false};
        }
      });

      const filteredRoutesIndexes = routes.reduce((filteredIndexes,route, idx) => {
        if (
          (route.airline === airlineId || airlineId === "all") &&
          (route.src === airportCode || route.dest === airportCode || airportCode === "all")
        ) {
          return filteredIndexes.concat(idx);
        }
        
        return filteredIndexes;
      }, []);

      const sliceStart = 0;
      const sliceEnd =
        25 > filteredRoutesIndexes.length ? filteredRoutesIndexes.length : 25;

      return {
        ...state,
        all: updatedRoutes,
        filteredRoutesIndexes,
        displayRange: [sliceStart, sliceEnd]
      };
    }
    case 'NEXT_PAGE': {
      const newDisplayRange = state.displayRange.map(num => num + 25);
      return {...state, displayRange: newDisplayRange}
    }
    case 'PREVIOUS_PAGE': {
      const newDisplayRange = state.displayRange.map(num => num - 25);
      return {...state, displayRange: newDisplayRange}
    }
    default:
      return state;
  }
}