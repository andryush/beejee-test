import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { statusCodes } from "../../../helpers/helpers";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import EditTaskModal from "./EditTaskModal/EditTaskModal";
import Checkbox from "@material-ui/core/Checkbox";
import { API_URL, DEVELOPER_NAME } from "../../../api/api";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  edit: {
    cursor: "pointer",
  },
});

export default function TaskListItem({ task, isAuth, token, getData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(
    task.status === 10 || task.status === 11 ? true : false
  );
  const classes = useStyles();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckbox = () => {
    let formData = new FormData();
    formData.append("text", task.text);

    if (task.status === 0) {
      formData.append("status", 10);
    }
    if (task.status === 10) {
      formData.append("status", 0);
    }
    if (task.status === 1) {
      formData.append("status", 11);
    }
    if (task.status === 11) {
      formData.append("status", 1);
    }

    formData.append("token", token);
    setIsChecked(!isChecked);
    fetch(`${API_URL}edit/${task.id}/?developer=${DEVELOPER_NAME}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        getData();
      });
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {task.username}
      </TableCell>
      <TableCell align="left">{task.email}</TableCell>
      <TableCell align="left">
        <div className={classes.flex}>
          <Checkbox
            checked={isChecked}
            disabled={!isAuth}
            onChange={handleCheckbox}
          />
          <div>
            {isAuth ? (
              <div className={classes.flex}>
                <div>
                  {/* <Checkbox
                    checked={task.status === 10 || task.status === 11}
                    disabled={true}
                  /> */}
                </div>
                <div className={classes.edit} id={task.id} onClick={openModal}>
                  <EditIcon />
                </div>
              </div>
            ) : null}
          </div>
          <div>{task.text}</div>
        </div>
      </TableCell>
      <TableCell align="right">{statusCodes[task.status]}</TableCell>
      <TableCell>
        <EditTaskModal
          taskText={task.text}
          taskId={task.id}
          isModalOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          token={token}
          getData={getData}
        />
      </TableCell>
    </TableRow>
  );
}
