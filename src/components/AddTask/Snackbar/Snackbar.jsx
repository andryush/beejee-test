import React from "react";
import { default as MaterialSnackbar } from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Snackbar({ isSnackbarOpen, handleCloseSnackbar }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MaterialSnackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Task added
        </Alert>
      </MaterialSnackbar>
    </div>
  );
}
