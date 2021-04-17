import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1rem",
  },
  btn: {
    backgroundColor: "#28a745",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "green",
    },
  },
});

export default function AddTask() {
  const classes = useStyles();

  return (
    <div className={classes.flex}>
      <Button variant="contained" className={classes.btn}>
        Add task
      </Button>
    </div>
  );
}
