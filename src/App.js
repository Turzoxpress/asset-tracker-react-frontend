import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./component/pages/login";
import Assets from "./component/pages/Assets";
import AddTask from "./component/pages/AddTask";
import ManageUsers from "./component/pages/ManageUsers";
import SignUp from "./component/pages/SignUp";

function App() {
  return (
    //basename="/apps/task/"
    //"homepage": "https://brlbd.com/apps/task/",
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Assets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/add_task" element={<AddTask />} />
        <Route path="/manage_users" element={<ManageUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
