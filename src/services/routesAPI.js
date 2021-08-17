import data from '../data.js';

// HELPERS
const getAirlineById = id => {
  const airlines = data.airlines;

  for (let idx = 0; idx < airlines.length; idx++) {
    let airline = airlines[idx];
    if (airline.id === id) return airline.name;
  }
  return null;
};

const getAirportById = id => {
  const airports = data.airports;

  for (let idx = 0; idx < airports.length; idx++) {
    let airport = airports[idx];
    if (airport.code === id) return airport.name;
  }

  return null;
};

export const getAllRoutes = () => {
  // return data.routes.map(route => {
  //   let routeProcessed = {
  //     ...route,
  //     airlineName: getAirlineById(route.airline),
  //     srcName: getAirportById(route.src),
  //     destName: getAirportById(route.dest),
  //     display: true,
  //   }

  //   routeProcessed.id = `${route.airline}-${route.src}-${route.dest}`;

  //   return routeProcessed;
  // });
  return data.routes;
}

export const getAllAirlines = () => {
  return data.airlines.map(airline => {
    return {...airline, display: true};
  })
}

export const getAllAirports = () => {
  return data.airports.map(airport => {
    return {...airport, display: true};
  })
}

export let cache = {};
export const getAll = () => {
  cache = {
    routesRAW: getAllRoutes(),
    airlinesRAW: getAllAirlines(),
    airportsRAW: getAllAirports()
  }
  return cache;
}
