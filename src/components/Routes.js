import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, previousPage } from '../reducers/routeReducer';

const Route = ({ route }) => {
  return (
    <tr>
      <td>{route.airlineName}</td>
      <td>{route.srcName}</td>
      <td>{route.destName}</td>
    </tr>
  );
}

const ChangePage = ({
  handlerPreviousPage,
  handlerNextPage,
  sliceStart,
  sliceEnd,
  numberOfRoutes
}) => {

  const previousDisabled = (sliceStart === 0);
  const nextDisabled = (sliceEnd === numberOfRoutes);

  return (
    <div className="pagination">
      <p>Showing {sliceStart + 1}-{sliceEnd} of {numberOfRoutes} routes.</p>
      <button onClick={handlerPreviousPage} 
              disabled={previousDisabled}
      >Previous Page</button>
      <button  onClick={handlerNextPage} 
               disabled={nextDisabled}
      >Next Page</button>
  </div>
  );
}

export const Routes = () => {
  const dispatch = useDispatch();

  const {all:routes, filteredRoutesIndexes, displayRange} =
    useSelector(state => state.routes);
  const numberOfRoutes = filteredRoutesIndexes.length;
  const sliceStart = displayRange[0];
  const sliceEnd = displayRange[1];

  const handleNextPage = event => {
    event.preventDefault();
    dispatch(nextPage());
  }

  const handlePreviousPage = event => {
    event.preventDefault();
    dispatch(previousPage());
  }
  return (
    <>
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
            filteredRoutesIndexes
              .slice(sliceStart, sliceEnd)
              .map(routeIdx => {
                const route = routes[routeIdx];
                return <Route key={route.id} route={route} />;
              })
          }
        </tbody>
      </table>
      < ChangePage
        handlerPreviousPage={handlePreviousPage}
        handlerNextPage={handleNextPage}
        {...{sliceStart, sliceEnd, numberOfRoutes}}
      />
    </>
  )
}