import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

//JSS styles - CSS in Javascript
// const styles = theme => ({
//   FormControl: {
//     width: 250
//   }
// });

//Controlled component - component that contains its own state
//We wrap the react component with the inject sheet function
//withStyles to enable JSS on the Component. Parses styles as classes
export default class extends Component {
  state = this.getInitState();

  getInitState() {
    const { exercise } = this.props;

    return exercise
      ? exercise
      : {
          title: "",
          description: "",
          muscles: ""
        };
  }

  handleChange = name => ({ target: { value } }) =>
    this.setState({
      //update the variable name
      [name]: value
    });

  handleSubmit = () => {
    //TODO: validate
    //destructure exercise from the state
    //calls the onCreate method
    this.props.onSubmit({
      id: this.state.title.toLowerCase().replace(/ /g, "-"),
      ...this.state
    });
  };

  render() {
    const { title, muscles, description } = this.state,
      { exercise, muscles: categories } = this.props;
    return (
      <form>
        <TextField
          label="Title"
          value={title}
          onChange={this.handleChange("title")}
          margin="normal"
          fullWidth
        />
        <br />
        <FormControl fullWidth>
          <InputLabel htmlFor="muscles">Muscles</InputLabel>
          <Select value={muscles} onChange={this.handleChange("muscles")}>
            {/* iterate through categories */}
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <TextField
          multiline
          rows="4"
          label="Description"
          value={description}
          onChange={this.handleChange("description")}
          margin="normal"
          fullWidth
        />
        <br />
        <Button
          color="primary"
          variant="raised"
          onClick={this.handleSubmit}
          disabled={!title || !muscles}
        >
          {exercise ? "Edit" : "Create"}
        </Button>
      </form>
    );
  }
}
