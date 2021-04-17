import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoginForm from "./LoginForm/LoginForm";

export default function Login({
  isLoginModalOpen,
  updateLoginModalStatus,
  updateLoginInformation,
  username,
  password,
  authorize,
  loginErrors,
}) {
  return (
    <div>
      <Dialog
        open={isLoginModalOpen}
        onClose={updateLoginModalStatus}
        aria-labelledby="alert-login-title"
        aria-describedby="alert-login-description"
      >
        <DialogTitle id="alert-login-title">{"Please Login"}</DialogTitle>
        <DialogContent>
          <LoginForm
            updateLoginInformation={updateLoginInformation}
            username={username}
            password={password}
            loginErrors={loginErrors}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={authorize} color="primary" autoFocus>
            Enter
          </Button>
          <Button onClick={updateLoginModalStatus} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
