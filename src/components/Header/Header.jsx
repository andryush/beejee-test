import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import beejeeLogo from "../../assets/images/beejee-logo.jpeg";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: "64px",
    height: "64px",
  },
}));

export default function Header({ updateLoginModalStatus, isAuth, logout }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img className={classes.logo} src={beejeeLogo} alt="Logo" />
          <Typography variant="h6" className={classes.title}>
            BeeJee
          </Typography>
          {isAuth ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={updateLoginModalStatus}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
