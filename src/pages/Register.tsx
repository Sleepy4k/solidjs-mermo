import Api from "../utils/Api";
import { checkCookie } from "../utils/Cookie";
import { useNavigate, A } from "@solidjs/router";
import { createSignal, Component, createEffect } from "solid-js";

const APP_NAME = import.meta.env.VITE_APP_NAME as string;

const Register: Component = () => {
  const navigate = useNavigate();
  const [data, setData] = createSignal({
    username: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleChange = (e: any) => {
    setData({ ...data(), [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (data().password !== data().confirmPassword) {
      alert("Password and Confirm Password must be same")
      return
    }

    const user = {
      username: data().username,
      password: data().password,
      role: "user"
    }

    Api.post("register", user, { withCredentials: false })
      .then((res) => {
        const value = res.data;

        if (value.status === "success") {
          alert("Register Success");
          navigate("/login");
        } else if (value.status == "failed") {
          alert("Register failed")
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
  };

  createEffect(() => {
    const isUserLoggedIn = checkCookie("auth_jwt_secret");

    if (isUserLoggedIn) {
      navigate("/");
    }
  });

  return (
    <div class="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div class="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
        <h1 class="text-3xl font-semibold text-center text-purple-700 uppercase">{APP_NAME} REGISTER</h1>
        <form class="mt-6">
          <div class="mb-2">
            <label class="block text-sm font-semibold text-gray-800">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={data().username}
              onchange={handleChange}
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div class="mb-2">
            <label class="block text-sm font-semibold text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data().password}
              onchange={handleChange}
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div class="mb-2">
            <label class="block text-sm font-semibold text-gray-800">Password Confirmation</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={data().confirmPassword}
              onchange={handleChange}
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div class="mt-6">
            <button onClick={handleSubmit} class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Register
            </button>
          </div>
        </form>

        <p class="mt-8 text-xs font-light text-center text-gray-700">
          Already have an account?{" "}
          <A href="/login" class="font-medium text-purple-600 hover:underline">
            Sign In
          </A>
        </p>
      </div>
    </div>
  );
};

export default Register;
