import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import Snackbar from "../Snackbar/Snackbar";
import { API_URL, DEVELOPER_NAME } from "../../../api/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  dialogContent: {
    width: "20rem",
  },
});

export default function Modal({
  updateNewTask,
  addTaskUsername,
  addTaskEmail,
  addTaskText,
  getData,
}) {
  const [open, setOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const createNewTask = () => {
    const errors = validateFields(addTaskUsername, addTaskEmail, addTaskText);
    if (Object.keys(errors).length <= 0) {
      let formData = new FormData();
      formData.append("username", addTaskUsername);
      formData.append("email", addTaskEmail);
      formData.append("text", addTaskText);

      fetch(`${API_URL}create?developer=${DEVELOPER_NAME}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            getData();
            setOpen(false);
            setIsSnackbarOpen(true);
            setErrors({});
          } else {
            console.log(data.status);
          }
        });
    } else {
      setErrors(errors);
    }
  };

  const handleClose = (e) => {
    setOpen(false);
    updateNewTask(e);
    setErrors({});
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const validateFields = (username, email, text) => {
    const errors = {};
    if (username.length <= 0) {
      errors.username = "This filed is required";
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.email = "Invalid email address";
    }
    if (text.length <= 0) {
      errors.text = "This filed is required";
    }
    return errors;
  };

  const classes = useStyles();

  return (
    <div>
      <div className={classes.flex}>
        <Button
          variant="contained"
          className={classes.btn}
          onClick={handleClickOpen}
        >
          Add task
        </Button>
      </div>
      <Dialog
        maxWidth="sm"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Create new task"}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <AddTaskForm
            updateNewTask={updateNewTask}
            addTaskUsername={addTaskUsername}
            addTaskEmail={addTaskEmail}
            addTaskText={addTaskText}
            errors={errors}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={createNewTask} color="primary">
            Add
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        isSnackbarOpen={isSnackbarOpen}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </div>
  );
}
