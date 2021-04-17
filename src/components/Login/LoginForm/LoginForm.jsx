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

export default function LoginForm({
  updateLoginInformation,
  username,
  password,
  loginErrors,
}) {
  const classes = useStyles();
  return (
    <div>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          error={loginErrors.password ? true : false}
          autoFocus
          name="username"
          value={username}
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth={true}
          required
          onChange={updateLoginInformation}
          helperText={loginErrors.username}
        />
        <TextField
          error={loginErrors.password ? true : false}
          value={password}
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth={true}
          required
          onChange={updateLoginInformation}
          helperText={loginErrors.password}
        />
        <p>{loginErrors.status}</p>
      </form>
    </div>
  );
}
