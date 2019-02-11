import React, { Component, Fragment } from "react";
import { Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Add from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Form from "./Form";
import { withContext } from "../../context";

//wrap our class withStyles()
class CreateDialog extends Component {
  state = {
    //open controls the form dialog via button
    open: false
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleFormSubmit = exercise => {
    this.handleToggle();
    this.props.onCreate(exercise);
  };

  render() {
    //destructure properties from the state
    const { open } = this.state,
      { muscles } = this.props;

    return (
      <Fragment>
        <Fab onClick={this.handleToggle} color="secondary">
          <Add />
        </Fab>
        {/* <Button variant="fab" onClick={this.handleToggle} mini>
            <Add />
          </Button> */}
        <Dialog open={open} onClose={this.handleToggle} fullWidth maxWidth="xs">
          <DialogTitle>Create a New Exercise</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below.
            </DialogContentText>
            <Form muscles={muscles} onSubmit={this.handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withContext(CreateDialog);
