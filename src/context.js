import React, { createContext } from "react";

export const { Provider, Consumer } = createContext();
//helper function for Consumer
export const withContext = Component => props => (
  <Consumer>{value => <Component {...value} {...props} />}</Consumer>
);
