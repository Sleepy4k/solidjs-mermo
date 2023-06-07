import Api from "../utils/Api";
import type { Component } from "solid-js";
import Sidebar from "../components/Sidebar";
import GridData from "../components/GridData";
import AuthLayout from "../layouts/AuthLayout";
import { createSignal } from "solid-js";

const User: Component = () => {
  const [data, setData] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const field = [{ field: "id" }, { field: "username" }, { field: "role" }];

  const afterFinish = () => {
    Api.get("user")
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
  }

  return (
    <AuthLayout onFinish={() => afterFinish()}>
      <Sidebar />
      <div class="p-4 sm:ml-64">
        {loading() ? null : <GridData data={data()} field={field} />}
      </div>
    </AuthLayout>
  );
};

export default User;
