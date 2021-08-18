import React from 'react';
import { useSelector } from 'react-redux';

const RouteVector = ({x1, y1, x2, y2}) => {
  return (
    <g key="">
      <circle className="source" cx={x1} cy={y1}>
        <title></title>
      </circle> 
      <circle className="destination" cx={x1} cy={y1}>
        <title></title>
      </circle>
      <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
    </g>
  )
}

export const Map = () => {
  const { all:routes, filteredRoutesIndexes } =
    useSelector(state => state.routes);

  return (
  <svg className="map" viewBox="-180 -90 360 180">
    <g transform="scale(1 -1)">
      <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
      
      {filteredRoutesIndexes.map(routeIdx => {
        const route = routes[routeIdx];
        return <RouteVector
          key={route.id}
          x1={route.srcLong}
          y1={route.srcLat}
          x2={route.destLong}
          y2={route.destLat}
        />
      })}
    </g>
  </svg>
  )
}