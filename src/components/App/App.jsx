import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { API_URL, DEVELOPER_NAME } from "../../api/api";
import Header from "../Header/Header";
import TaskList from "../TaskList/TaskList";
import Modal from "../AddTask/Modal/Modal";
import Login from "../Login/Login";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageCount, setMaxPageCount] = useState(0);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState("");
  const [addTaskUsername, setAddTaskUsername] = useState("");
  const [addTaskEmail, setAddTaskEmail] = useState("");
  const [addTaskText, setAddTaskText] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(
    cookies.get("token") !== undefined || false
  );
  const [loginErrors, setLoginErrors] = useState({});

  const updateCurrentPage = (e, page) => {
    setCurrentPage(page);
  };

  const updateSorting = (e) => {
    setSortField(e.target.id);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const updateNewTask = (e) => {
    if (e.target.name !== undefined) {
      switch (e.target.name) {
        case "username":
          setAddTaskUsername(e.target.value);
          break;
        case "email":
          setAddTaskEmail(e.target.value);
          break;
        case "text":
          setAddTaskText(e.target.value);
          break;
        default:
          return;
      }
    } else {
      setAddTaskUsername("");
      setAddTaskEmail("");
      setAddTaskText("");
    }
  };

  const updateLoginModalStatus = (e) => {
    switch (e.target.innerText) {
      case "LOGIN":
        setIsLoginModalOpen(true);
        break;
      default:
        setIsLoginModalOpen(false);
        setUsername("");
        setPassword("");
    }
  };

  const updateLoginInformation = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        return;
    }
  };

  const validateFields = (username, password) => {
    let errors = {};
    if (username.length <= 0) {
      errors.username = "This field is required";
    }
    if (password.length <= 0) {
      errors.password = "This field is required";
    }
    return errors;
  };

  const authorize = () => {
    let errors = validateFields(username, password);
    if (Object.keys(errors).length <= 0) {
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      fetch(`${API_URL}login?developer=${DEVELOPER_NAME}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== "error") {
            cookies.set("token", data.message.token, {
              path: "/",
              maxAge: 86400,
            });
            setIsLoginModalOpen(false);
            setIsAuth(true);
            setLoginErrors({});
            setUsername("");
            setPassword("");
          } else {
            errors = { ...errors, status: data.message.password };
            setLoginErrors(errors);
          }
        });
    } else {
      setLoginErrors(errors);
    }
  };

  const logout = () => {
    cookies.remove("token");
    setIsAuth(false);
  };

  const getData = () => {
    fetch(
      `${API_URL}?developer=${DEVELOPER_NAME}&page=${currentPage}&sort_field=${sortField}&sort_direction=${sortDirection}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.message.tasks);
        setMaxPageCount(Math.ceil(Number(data.message.total_task_count) / 3));
        setAddTaskUsername("");
        setAddTaskEmail("");
        setAddTaskText("");
      });
  };

  useEffect(() => {
    fetch(
      `${API_URL}?developer=${DEVELOPER_NAME}&page=${currentPage}&sort_field=${sortField}&sort_direction=${sortDirection}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.message.tasks);
        setMaxPageCount(Math.ceil(Number(data.message.total_task_count) / 3));
      });
  }, [currentPage, sortField, sortDirection]);

  return (
    <div>
      <Header
        updateLoginModalStatus={updateLoginModalStatus}
        isAuth={isAuth}
        logout={logout}
      />
      <Container>
        <Modal
          updateNewTask={updateNewTask}
          addTaskUsername={addTaskUsername}
          addTaskEmail={addTaskEmail}
          addTaskText={addTaskText}
          getData={getData}
        />
        <TaskList
          tasks={tasks}
          currentPage={currentPage}
          maxPageCount={maxPageCount}
          updateCurrentPage={updateCurrentPage}
          updateSorting={updateSorting}
          sortField={sortField}
          sortDirection={sortDirection}
          isAuth={isAuth}
          token={cookies.get("token")}
          getData={getData}
        />
        <Login
          isLoginModalOpen={isLoginModalOpen}
          updateLoginModalStatus={updateLoginModalStatus}
          updateLoginInformation={updateLoginInformation}
          username={username}
          password={password}
          authorize={authorize}
          loginErrors={loginErrors}
        />
      </Container>
    </div>
  );
}
