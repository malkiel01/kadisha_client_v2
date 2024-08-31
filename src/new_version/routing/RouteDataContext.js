// RouteDataContext.js
import React from 'react';

export const RouteDataContext = React.createContext();

export const RouteDataProvider = ({ children, value }) => {
  return <RouteDataContext.Provider value={value}>{children}</RouteDataContext.Provider>;
};
