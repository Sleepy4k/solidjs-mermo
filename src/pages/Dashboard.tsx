import Api from "../utils/Api";
import Sidebar from "../components/Sidebar";
import PieChart from "../components/PieChart";
import AuthLayout from "../layouts/AuthLayout";
import { Component, createSignal, createEffect } from "solid-js";

const Dashboard: Component = () => {
  const [loading, setLoading] = createSignal(true);
  const [data, setData] = createSignal([]);

  createEffect(() => {
    Api.get("product")
    .then((res) => {
      const value = res.data;
      const data = value.data

      if (value.status === "success") {
        setData(data)
        setLoading(false)
      } else if (value.status == "failed") {
        alert("Failed to fetch data")
      } else {
        alert("Something went wrong")
      }
    })
    .catch((err) => {
      const msg = err.message

      if (msg === "Network Error") {
        alert("Could not connect to server")
      } else {
        alert(msg)
      }
    })
  });

  return (
    <AuthLayout>
      <Sidebar />
      <div class="p-4 sm:ml-64">
        <h1>Dashboard</h1>
        {loading() ? null : <PieChart name="product" data={data()} />}
      </div>
    </AuthLayout>
  );
};

export default Dashboard;
