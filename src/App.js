import React, { useEffect } from 'react';
import './App.css';
import data from './data.js'
// import { nanoid } from 'nanoid'
import { Routes } from './components/Routes';
import { Map } from './components/Map';
import { useDispatch } from 'react-redux';
import { initializeRoutes } from './reducers/routeReducer';
import { Filter } from './components/Filter';
import { initializAirlines } from './reducers/airlineReducer';
import { initializeAirports } from './reducers/airportReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeRoutes());
    dispatch(initializAirlines());
    dispatch(initializeAirports());
  }, [dispatch])

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Map />
        <Filter />
        <Routes />
      </section>
    </div>
  )
}

export default App;