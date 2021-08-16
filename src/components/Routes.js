import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Route = ({ route }) => {
  return (
    <tr>
      <td>{route.airline}</td>
      <td>{route.src}</td>
      <td>{route.dest}</td>
    </tr>
  )
}

export const Routes = () => {
  const dispatch = useDispatch();
  const routes = useSelector(state => state.routes)
  return (
    <table>
      <tr>
        <th>airline</th>
        <th>src</th>
        <th>dest</th>
      </tr>
      {routes.map(route => <Route route={route} />)}
    </table>
  )
}