import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
//import themes
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { grey, blue } from "@material-ui/core/colors";

//create an muitheme object
const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[800]
    },
    secondary: {
      main: grey[200],
      // light: grey[100],
      dark: grey[400],
      contrastText: blue[800]
    }
    // type: 'dark'
  },
  spacing: {
    unit: 10
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
