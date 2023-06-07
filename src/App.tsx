import "./index.css";
import { Component, lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";

const Login = lazy(() => import("./pages/Login"));
const Product = lazy(() => import("./pages/Product"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SparePart = lazy(() => import("./pages/SparePart"));

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/product" component={Product} />
      <Route path="/register" component={Register} />
      <Route path="/spare-part" component={SparePart} />
    </Routes>
  );
};

export default App;
