import data from '../data.js';

// HELPERS

export const getAllRoutes = () => {
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
