import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import constants from "../utils/constants";

import axios from "axios";

import data from "../assets/data.json";
import data3 from "../assets/data3.json";

import ToDoList from "./ToDoList";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import Navbar from "./NavBar";

import MoonLoader from "react-spinners/MoonLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "green",
  marginTop: 50,
};

export default function () {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#07b428");

  const [taskCounter, setTaskCounter] = useState(data3);

  const navigate = useNavigate();

  const navigateLogin = () => {
    // 👇️ navigate to /
    navigate("/login");
  };

  const navigateAddTask = () => {
    // 👇️ navigate to /
    navigate("/add_task");
  };

  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  let role = localStorage.getItem("role");

  if (!isLoggedIn) {
    isLoggedIn = false;
  }

  const [tasks, setTasks] = useState(data);

  let taskStatus = localStorage.getItem("taskStatus");
  if (!taskStatus) {
    taskStatus = "borrowed";
  }

  console.log("Tasks status : " + taskStatus);

  const loadTaskData = () => {
    // alert(status);
    // return;
    //---------------
    setLoading(true);
    axios({
      method: "post",
      url: constants.backend_server + constants.getAllItems,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        status: taskStatus,
      },
    })
      .then(function (response) {
        console.log(response.data);

        // console.log(response.status);

        // //setToDoList(response.data.data);
        // alert(response.data.message);
        // window.location.reload(false);
        //return response;

        if (response.data.status === 200) {
          // alert(response.data.count);
          setTasks(response.data.data);
          // alert(tasks);
          console.log(tasks);

          getTaskCount();
        } else {
          alert(response.data.message);

          setLoading(false);
        }
      })
      .catch(function (error) {
        return error;
      });

    //-------------------------------
  };

  React.useEffect(() => {
    loadTaskData();
  }, []);

  const getTaskCount = () => {
    console.log("Entered task count............");
    axios({
      method: "get",
      url: constants.backend_server + constants.getTotalItemCount,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(function (response) {
        if (response.data.status === 200) {
          console.log("task counter : " + response.data.data.total);

          setTaskCounter(response.data.data);

          console.log("task counter after : " + taskCounter.total);
        } else {
          //alert(response.data.message);
          console.log(response.data.message);
        }

        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        return error;
      });
  };

  const handleToggle = (id) => {
    setLoading(true);
    // alert(id);
    // return;
    let parts = id.split("_");
    // if (parts[1] === "created") {
    //   tempStatus = "completed";
    // }

    // console.log("Previous status : " + parts[1]);
    // console.log("Current status : " + tempStatus);

    //-----------------

    axios({
      method: "post",
      url: constants.backend_server + constants.changeItemStatus,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        item_id: parts[0],
        status: parts[1],
      },
    })
      .then(function (response) {
        console.log(response.data);

        //setToDoList(response.data.data);

        // window.location.reload(false);
        //return response;

        if (
          response.data.status === 403 ||
          response.data.status === 501 ||
          response.data.status === 401
        ) {
          alert(
            "You do not have permission to do this request! Please login again."
          );
        } else {
          if (response.data.status === 200) {
            //window.location.reload(false);
            // alert(response.data.message);
            // window.location.reload(false);
            //document.getElementById(id).style.visibility = "hidden";
            loadTaskData();
          } else {
            alert(response.data.message);
          }
        }

        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        return error;
      });
  };

  const handleDelete = (id) => {
    //------- Delete confirmation
    const options = {
      title: "Delete",
      message: "Do you want to delete this task?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setLoading(true);
            axios({
              method: "post",
              url: constants.backend_server + constants.deleteItem,
              headers: { Authorization: `Bearer ${token}` },
              data: {
                item_id: id,
              },
            })
              .then(function (response) {
                console.log(response.data);

                //setToDoList(response.data.data);

                // window.location.reload(false);
                //return response;

                if (
                  response.data.status === 403 ||
                  response.data.status === 501 ||
                  response.data.status === 401
                ) {
                  alert(
                    "You do not have permission to do this request! Please login again."
                  );
                } else {
                  if (response.data.status === 200) {
                    //window.location.reload(false);
                    // alert(response.data.message);
                    // window.location.reload(false);
                    loadTaskData();
                    //document.getElementById(id).style.visibility = "hidden";
                  } else {
                    alert(response.data.message);
                  }
                }

                setLoading(false);
              })
              .catch(function (error) {
                setLoading(false);
                return error;
              });
          },
        },
        {
          label: "No",
          // onClick: () => alert("Click No"),
        },
      ],
      closeOnEscape: false,
      closeOnClickOutside: false,
    };

    confirmAlert(options);

    //-----------------------------------------
  };

  const handleLogout = (id) => {
    localStorage.clear();
    window.location.reload(false);
  };

  //enum: ["", "", ""],
  const handleBorrowedButtonClick = () => {
    localStorage.setItem("taskStatus", "borrowed");
    window.location.reload(false);
  };

  const handleReturnedButtonClick = () => {
    localStorage.setItem("taskStatus", "returned");
    window.location.reload(false);
  };

  const handleDeletedButtonClick = () => {
    localStorage.setItem("taskStatus", "deleted");
    window.location.reload(false);
  };

  return (
    <div className="sweet-loading">
      {loading ? (
        <MoonLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
        />
      ) : (
        <div>
          <div>
            <Navbar />
          </div>

          <br></br>
          <br></br>

          {/* <div>
            <button onClick={navigateLogin}>Login</button>
          </div> */}

          <div class="container">
            <div class="row">
              <div class="col-sm">
                <button
                  type="button"
                  className="btn btn-primary m-1 btn-block"
                  onClick={handleBorrowedButtonClick}
                >
                  Borrowed <b>{" (" + taskCounter.borrowed + ")"}</b>
                </button>
              </div>
              <div class="col-sm">
                <button
                  type="button"
                  className="btn btn-success m-1 btn-block"
                  onClick={handleReturnedButtonClick}
                >
                  Returned <b>{" (" + taskCounter.returned + ")"}</b>
                </button>
              </div>

              {/* {isLoggedIn && (role === "admin" || role === "employee") ? (
                <div class="col-sm">
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger m-1 btn-block"
                      onClick={handleDeletedButtonClick}
                    >
                      Deleted <b>{" (" + taskCounter.deleted + ")"}</b>
                    </button>
                  </div>
                </div>
              ) : (
                <div></div>
              )} */}
            </div>
          </div>

          <div>
            <ToDoList
              toDoList={tasks}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
              isLoggedIn={isLoggedIn}
              role={role}
              page = "user"
            />
          </div>
        </div>
      )}
    </div>
  );
}
