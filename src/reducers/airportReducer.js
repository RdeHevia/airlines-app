import { cache, getAll } from "../services/routesAPI";

// HELPERS
export const findAirlinesByAirport = (airportCode, routesRAW) => {
  const airlines = {};
  routesRAW.forEach(route => {
    if (route.src === airportCode || route.dest === airportCode) {
      airlines[route.airline] = true;
    }
  });
  return airlines;
}

// ACTION CREATORS
export const initializeAirports = () => {
  const {routesRAW, airportsRAW} = 
  JSON.stringify(cache) === '{}' ? getAll() : cache;
  const airports = airportsRAW.map(airport => {
    return {
      ...airport,
      airlines: findAirlinesByAirport(airport.code, routesRAW),
      display: true,
    }
  });

  return {
    type: 'INIT_AIRPORTS',
    data: airports,
  }
}

// REDUCER
export const airportReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_AIRPORTS':
      return action.data;
    case 'FILTER':
      const airports = state;
      const { airlineId, airportCode, airlineAirports } = action.data;
      return airports.map(airport => {
        if (
          (airlineId === "all" && airportCode === "all") ||
          (airlineAirports[airport.code] && airportCode === "all") ||
          (airportCode === airport.code)
        ) {
          return {...airport, display: true};
        } else {
          return {...airport, display: false};
        }
      })
    default:
      return state;
  }
}