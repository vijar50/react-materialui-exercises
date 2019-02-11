import React, { Fragment } from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Form from "./Form";
import { withStyles } from "@material-ui/core/styles";
import { withContext } from "../../context";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
    overflowY: "auto",
    [theme.breakpoints.up("sm")]: {
      marginTop: 5,
      height: "calc(100% - 10px)"
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%"
    }
  },
  //set html, body tag and div with id=root to 100%
  "@global": {
    "html, body, #root": {
      height: "100%"
    }
  },
  //set the Grid that has a class of container to 100% - top/bottom bar
  container: {
    //Media queries for small and up sizes and xs sizes
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px - 48px)"
    },
    [theme.breakpoints.down("xs")]: {
      height: "calc(100% - 56px - 48px)"
    }
  },
  //This class applied to grid
  item: {
    [theme.breakpoints.down("xs")]: {
      height: "50%"
    }
  }
});

const Exercises = ({
  classes,
  muscles,
  exercisesByMuscles,
  category,
  editMode,
  onSelect,
  exercise,
  exercise: {
    id,
    title = "Welcome!",
    description = "Please select an exercise from the list."
  },
  onDelete,
  onSelectEdit,
  onEdit
}) => (
  //Container is small (sm={12}) boxes, can specify count.
  <Grid container className={classes.container}>
    {/* Left Pane */}
    <Grid item className={classes.item} xs={12} sm={6}>
      <Paper className={classes.paper}>
        {exercisesByMuscles.map(([group, exercises]) =>
          !category || category === group ? (
            <Fragment key={group}>
              <Typography
                variant="headline"
                color="primary"
                style={{ textTransform: "capitalize" }}
              >
                {group}
              </Typography>
              <List component="ul">
                {exercises.map(({ id, title }) => (
                  <ListItem key={id} button onClick={() => onSelect(id)}>
                    <ListItemText primary={title} />
                    <ListItemSecondaryAction>
                      <IconButton
                        color="secondary:dark"
                        onClick={() => onSelectEdit(id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary:dark"
                        onClick={() => onDelete(id)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Fragment>
          ) : null
        )}
      </Paper>
    </Grid>
    {/* Right Pane */}
    <Grid item className={classes.item} xs={12} sm={6}>
      <Paper className={classes.paper}>
        <Typography variant="display1" color="primary" gutterBottom>
          {title}
        </Typography>
        {editMode ? (
          <Form
            key={id}
            exercise={exercise}
            muscles={muscles}
            onSubmit={onEdit}
          />
        ) : (
          <Typography variant="subheading">{description}</Typography>
        )}
      </Paper>
    </Grid>
  </Grid>
);

export default withContext(withStyles(styles)(Exercises));
