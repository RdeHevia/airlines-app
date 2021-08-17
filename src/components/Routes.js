import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const listSelectedRoutes = (routes, airlineId) => {
  if (airlineId === 'all') return routes;

  return routes.filter()
}

const Route = ({ route }) => {
  return (
    <tr>
      <td>{route.airlineName}</td>
      <td>{route.srcName}</td>
      <td>{route.destName}</td>
    </tr>
  )
}

export const Routes = () => {
  const routes = useSelector(state => state.routes)
  return (
    <table className="routes-table">
      <thead>
        <tr>
          <th>Airline</th>
          <th>Source Airport</th>
          <th>Destination Airport</th>
        </tr>
      </thead>
      <tbody>
        {
          routes
            .filter(route => route.display)
            .map(route => <Route key={route.id} route={route} />)
        }
      </tbody>
    </table>
  )
}