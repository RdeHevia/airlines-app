// ACTION CREATORS
export const filter = currentFilter => {
  return {
    type: 'FILTER',
    data: { ...currentFilter }
  }
}

// REDUCER
export const filterReducer = (
  state = {
    airlineId: "all",
    airportCode: "all",
    airlineAirports: {},
    airportAirlines: {}
  },
  action
  ) => {
  switch (action.type) {
    case 'FILTER':
      return { ...action.data };
    default:
      return { ...state };
  }
}