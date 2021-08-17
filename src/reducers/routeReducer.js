import { getAllRoutes, cache, getAll } from '../services/routesAPI';

// ACTION CREATORS
export const initializeRoutesSS = () => {
  return {
    type: 'INIT_ROUTES',
    data: getAllRoutes(),
  }
}

const getAirlineById = (id, airlines) => {
  for (let idx = 0; idx < airlines.length; idx++) {
    let airline = airlines[idx];
    if (airline.id === id) return airline.name;
  }
  return null;
}
const getAirportNameById = (id, airports) => {
  for (let idx = 0; idx < airports.length; idx++) {
    let airport = airports[idx];
    if (airport.code === id) return airport.name;
  }

  return null;
}

const getAirportCoordinatesById = (id, airports) => {
  for (let idx = 0; idx < airports.length; idx++) {
    let airport = airports[idx];
    if (airport.code === id) return [airport.lat, airport.long];
  }
  return [null, null];
}

export const initializeRoutes = () => {
  const {routesRAW, airlinesRAW, airportsRAW} = 
    JSON.stringify(cache) === '{}' ? getAll() : cache;

  const routes = routesRAW.map(routeRAW => {
    const [srcLat, srcLong] = getAirportCoordinatesById(routeRAW.src, airportsRAW);
    const [destLat, destLong] = getAirportCoordinatesById(routeRAW.dest, airportsRAW);
    const id = `${routeRAW.airline}-${routeRAW.src}-${routeRAW.dest}`;
    const route = {
      ...routeRAW,
      airlineName: getAirlineById(routeRAW.airline, airlinesRAW),
      srcName: getAirportNameById(routeRAW.src, airportsRAW),
      srcLat,
      srcLong,
      destName: getAirportNameById(routeRAW.dest, airportsRAW),
      destLat,
      destLong,
      id
    }
    return route;
  });

  return {
    type: 'INIT_ROUTES',
    data: routes,
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

      const filteredRoutesIndexes = routes.reduce((filteredIndexes, route, idx) => {
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