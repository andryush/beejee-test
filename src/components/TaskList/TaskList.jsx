import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TaskListItem from "../TaskList/TaskListItem/TaskListItem";
import Pagination from "./Pagination/Pagination";
const useStyles = makeStyles({
  root: {
    marginTop: "1rem",
  },
  table: {
    minWidth: 650,
  },
  pagination: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1rem",
  },
  sorting: {
    cursor: "pointer",
  },
});

export default function TaskList({
  tasks,
  currentPage,
  maxPageCount,
  updateCurrentPage,
  updateSorting,
  sortField,
  sortDirection,
  isAuth,
  token,
  getData,
}) {
  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <div
                  id="username"
                  onClick={updateSorting}
                  className={classes.sorting}
                >
                  Username
                </div>
              </TableCell>
              <TableCell align="left">
                <div
                  id="email"
                  onClick={updateSorting}
                  className={classes.sorting}
                >
                  E-mail
                </div>
              </TableCell>
              <TableCell align="left">Text</TableCell>
              <TableCell align="right">
                <div
                  id="status"
                  onClick={updateSorting}
                  className={classes.sorting}
                >
                  Status
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => {
              return (
                <TaskListItem
                  key={task.id}
                  task={task}
                  isAuth={isAuth}
                  token={token}
                  getData={getData}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.pagination}>
        <Pagination
          currentPage={currentPage}
          maxPageCount={maxPageCount}
          updateCurrentPage={updateCurrentPage}
        />
      </div>
    </div>
  );
}
