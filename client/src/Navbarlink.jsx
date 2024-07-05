import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Notfound from "./Notfound";
import Logout from "./components/Logout";

function Navbarlink() {
  const isUserSignedIn = !!localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      {isUserSignedIn && (
        <Route path="/dashboard/dashboard" element={<Dashboard />} />
      )}
      <Route path="*" element={<Notfound />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default Navbarlink;
