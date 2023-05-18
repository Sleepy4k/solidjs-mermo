import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";

// import pages 
import Home from "../pages/Home";

// Import pages lazily
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

function App() {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Routes>
  );
}

export default App