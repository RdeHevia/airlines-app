import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { filter } from '../reducers/filterReducer';
import { findAirportsByAirline } from '../reducers/airlineReducer';
import { getAllAirlines } from '../services/routesAPI';
import { findAirlinesByAirport } from '../reducers/airportReducer';

const Select = ({ list, handler, valueKey, currentValue, title}) => {
  return (
  <select value={currentValue} onChange={handler}>
    <option value="all">{title}</option>
    {list.map(item => {
      return (
      <option key={item[valueKey]} value={item[valueKey]} disabled={!item.display}>
        {item.name}
      </option>
      )
    })}
  </select>
  );
}

const ClearFilter = ({ handler, airlineId, airportCode }) => {
  const disabled = airlineId === "all" && airportCode === "all";
  return (
    <>
      <button onClick={handler} disabled={disabled}>Show All Routes</button>
    </>
  );
}

export const Filter = () => {
  const dispatch = useDispatch();

  
  const currentFilter = useSelector(state => state.filter);
  const routes = useSelector(state => state.routes.all);


  const handleAirlineSelection = event => {
    const airlineId = +event.target.value ? +event.target.value : event.target.value;
    const airlineAirports = findAirportsByAirline(airlineId, routes);

    dispatch(filter({...currentFilter, airlineId, airlineAirports}));
  }

  const handleAirportSelection = event => {
    const airportCode = event.target.value;
    const airportAirlines = findAirlinesByAirport(airportCode, routes);

    dispatch(filter({...currentFilter, airportCode, airportAirlines}));
  }

  const handleClearFilter = event => {
    event.preventDefault();
    dispatch(filter({
      ...currentFilter,
      airlineId: "all",
      airportCode: "all"
    }));
  }

  return (
    <p>
      Show routes on
      <Select list={useSelector(state => state.airlines)} 
              handler={handleAirlineSelection}
              valueKey="id"
              currentValue={useSelector(state => state.filter.airlineId)}
              title="All Airlines"
      />
      flying in or out of
      <Select list={useSelector(state => state.airports)} 
              handler={handleAirportSelection}
              valueKey="code"
              currentValue={useSelector(state => state.filter.airportCode)}
              title="All Airports"
      />
      <ClearFilter handler={handleClearFilter}
                   airlineId={currentFilter.airlineId}
                   airportCode={currentFilter.airportCode}
      />
    </p>
  )
}