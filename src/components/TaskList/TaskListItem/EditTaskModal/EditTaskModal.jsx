import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { API_URL, DEVELOPER_NAME } from "../../../../api/api";

export default function EditTaskModal({
  taskText,
  taskId,
  isModalOpen,
  openModal,
  closeModal,
  token,
  getData,
}) {
  const [text, setText] = useState(taskText);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const saveText = () => {
    let formData = new FormData();
    formData.append("text", text);
    formData.append("status", 1);
    formData.append("token", token);
    fetch(`${API_URL}edit/${taskId}/?developer=${DEVELOPER_NAME}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        closeModal();
        getData();
      });
  };

  return (
    <div>
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit task"}</DialogTitle>
        <DialogContent>
          <TextField
            style={{ width: "25rem" }}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={text}
            onChange={handleChange}
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveText} color="primary" autoFocus>
            Save
          </Button>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
