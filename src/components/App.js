import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Header, Footer } from "./layouts";
import Exercises from "./exercises";
import { muscles, exercises } from "../store";
import { Provider } from "../context";

class App extends Component {
  //get the exercises const from store.js
  state = {
    exercises,
    exercise: {}
  };

  //Method for sorting exercises by muscles
  getExercisesByMuscles() {
    const initExercises = muscles.reduce(
      (exercises, category) => ({
        ...exercises,
        [category]: []
      }),
      {}
    );

    //Object.entries returns an array of a object's own enumerable
    //property pairs. We use this to display in the left pane
    //.reduce applies a function to each element in the array
    //to reduce the array to a single value
    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        //deconstruct the muscles inside the exercise object
        const { muscles } = exercise;
        //ternary operation: puts all the exercises objects into muscle
        //arrays. ([...arr[pos],newArr] is spread operator using concat.
        //is something stored in exercises[muscles]? if yes:
        //spread elements of array into new array exercise, else create
        //new array exercise
        exercises[muscles] = [...exercises[muscles], exercise];
        return exercises;
      }, initExercises)
    );
  }

  //update footer to be on the current category
  handleCategorySelect = category => {
    this.setState({
      category
    });
  };

  //parse the exercise selected to the right pane
  handleExerciseSelect = id => {
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: false
    }));
  };

  handleExerciseCreate = exercise => {
    this.setState(({ exercises }) => ({
      exercises: [...exercises, exercise]
    }));
  };

  handleExerciseDelete = id => {
    this.setState(({ exercises, exercise, editMode }) => ({
      exercises: exercises.filter(ex => ex.id !== id),
      editMode: exercise.id === id ? false : editMode,
      exercise: exercise.id === id ? {} : exercise
    }));
  };

  handleExerciseSelectEdit = id => {
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: true
    }));
  };

  handleExerciseEdit = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [...exercises.filter(ex => ex.id !== exercise.id), exercise],
      exercise
    }));

  getContext = () => ({
    //extract the muscles from the state (extracted from store)
    muscles,
    ...this.state,
    exercisesByMuscles: this.getExercisesByMuscles(),
    onCategorySelect: this.handleCategorySelect,
    onCreate: this.handleExerciseCreate,
    onEdit: this.handleExerciseEdit,
    onSelectEdit: this.handleExerciseSelectEdit,
    onDelete: this.handleExerciseDelete,
    onSelect: this.handleExerciseSelect
  });

  render() {
    return (
      <Provider value={this.getContext()}>
        {/* CssBaseline elimates default browser margin */}
        <CssBaseline />
        <Header />
        {/* get the exercises from store.js and parse to the Exercises
        which is in exercises/index.js */}
        {/* get the category from state */}
        <Exercises />
        {/* get the muscles const from store.js and parse to Footer */}
        <Footer />
      </Provider>
    );
  }
}

export default App;
