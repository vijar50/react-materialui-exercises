import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CreateDialog from "../exercises/Dialog";
import { withStyles } from "@material-ui/core";

const styles = {
  flex: {
    flex: 1
  }
};

export default withStyles(styles)(({ classes }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        component="h2"
        variant="headline"
        color="inherit"
        // Push the button to the far right using styles
        className={classes.flex}
      >
        Exercise Database
      </Typography>
      <CreateDialog />
    </Toolbar>
  </AppBar>
));
