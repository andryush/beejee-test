import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    height: "10rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "50rem",
  },
});
export default function AddTaskForm({
  updateNewTask,
  addTaskUsername,
  addTaskEmail,
  addTaskText,
  errors,
}) {
  const classes = useStyles();
  return (
    <div>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          error={errors.username ? true : false}
          helperText={errors.username}
          name="username"
          value={addTaskUsername}
          id="username"
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth={true}
          required
          onChange={updateNewTask}
        />
        <TextField
          error={errors.email ? true : false}
          helperText={errors.email}
          value={addTaskEmail}
          name="email"
          id="email"
          label="E-mail"
          variant="outlined"
          margin="normal"
          fullWidth={true}
          required
          onChange={updateNewTask}
        />
        <TextField
          error={errors.text ? true : false}
          helperText={errors.text}
          value={addTaskText}
          name="text"
          id="text"
          label="Text"
          variant="outlined"
          multiline
          margin="normal"
          fullWidth={true}
          required
          onChange={updateNewTask}
        />
      </form>
    </div>
  );
}
