import { BrowserRouter as Routers } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NavbarMenu from "./components/Navbar";
import Navbarlink from "./Navbarlink";
export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function App() {
  
  return (
    <>
      <Routers>
        <NavbarMenu />
        <Navbarlink />
        <ToastContainer />
      </Routers>
    </>
  );
}

export default App;
