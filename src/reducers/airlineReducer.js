import { cache, getAll } from "../services/routesAPI";

// HELPERS
export const findAirportsByAirline = (airlineId, routesRAW) => {
  const airports = {};
  routesRAW.forEach(route => {
    if (route.airline === airlineId) {
      airports[route.src] = true;
      airports[route.dest] = true;
    }
  });
  return airports;
}

// ACTION CREATORS
export const initializAirlines = () => {
  const {routesRAW, airlinesRAW} = 
    JSON.stringify(cache) === '{}' ? getAll() : cache;
  const airlines = airlinesRAW.map(airline => {
    return {
      ...airline,
      airports: findAirportsByAirline(airline.id, routesRAW),
      display: true
    }
  });

  return {
    type: 'INIT_AIRLINES',
    data: airlines
  }
}

// REDUCER
export const airlineReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_AIRLINES':
      return action.data;

    case 'FILTER':
      const airlines = state;
      const { airlineId, airportCode, airportAirlines } = action.data;
      return airlines.map(airline => {
        if (
          (airlineId === "all" && airportCode === "all") ||
          (airlineId === "all" && airportAirlines[airline.id]) ||
          (airlineId === airline.id)
        ) {
          return {...airline, display: true};
        } else {
          return {...airline, display: false};
        }
      })
    default:
      return state;
  }
}