import "./home.module.css"
import Api from "../utils/Api"
import { createEffect } from "solid-js"
import Sidebar from "../components/Sidebar"
import { useNavigate } from "@solidjs/router"
import { getOrCreateStorage, deleteStorage } from "../utils/LocalStorage"

function Home() {
  const navigate = useNavigate()
  const [user, setUser] = getOrCreateStorage("user", null)

  createEffect(() => {
    if (user()) {
      console.log("User is logged in")
    } else {
      navigate("/login")
    }
  })

  const handleLogout = () => {
    Api.post("/logout", null)
      .then((res) => {
        const data = res.data

        if (data.status == "OK") {
          alert("Logout successful")
          deleteStorage("user")
          navigate("/login")
        } else if (data.status == "ERROR") {
          alert("Logout failed due " + data.info)
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

  const handleData = () => {
    Api.get("/product")
      .then((res) => {
        const data = res.data

        if (data.status == "OK") {
          alert("Data: " + JSON.stringify(data.data))
        } else if (data.status == "ERROR") {
          alert("Data failed due " + data.info)
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

  if (!user()) {
    navigate("/login")
    return
  }

  return (
    <div class="container">
      <Sidebar />
      <div class="content">
        <h1>Welcome to my website</h1>
        <p>ID : {user().id}</p>
        <p>Name : {user().username}</p>
        <p>Role : {user().role}</p>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleData}>Data</button>
      </div>
    </div>
  )
}

export default Home