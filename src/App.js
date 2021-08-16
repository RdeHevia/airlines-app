import React, { useEffect } from 'react';
import './App.css';
import data from './data.js'
// import { nanoid } from 'nanoid'
import { Routes } from './components/Routes';
import { useDispatch } from 'react-redux';
import { initializeRoutes } from './reducers/routeReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(initializeRoutes()), [dispatch])

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>
        <Routes />
      </section>
    </div>
  )
}

export default App;