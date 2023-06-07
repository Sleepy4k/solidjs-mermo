import Api from "../utils/Api";
import type { Component } from "solid-js";
import Sidebar from "../components/Sidebar";
import GridData from "../components/GridData";
import AuthLayout from "../layouts/AuthLayout";
import { createSignal, createEffect } from "solid-js";

const SparePart: Component = () => {
  const [loading, setLoading] = createSignal(true);
  const [data, setData] = createSignal([]);
  const field = [{ field: "id" }, { field: "name" }, { field: "price" }];

  createEffect(() => {
    Api.get("spare_part")
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
        {loading() ? null : <GridData data={data()} field={field} />}
      </div>
    </AuthLayout>
  );
};

export default SparePart;