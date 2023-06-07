import Api from "../utils/Api";
import { createSignal } from "solid-js";
import type { Component } from "solid-js";
import Sidebar from "../components/Sidebar";
import GridData from "../components/GridData";
import AuthLayout from "../layouts/AuthLayout";

const Product: Component = () => {
  const [data, setData] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const field = [{ field: "id" }, { field: "name" }, { field: "price" }, { field: "amount" }];

  const afterFinish = () => {
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

export default Product;
