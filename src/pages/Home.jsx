import "./home.module.css"
import { createEffect } from "solid-js"
import Sidebar from "../components/Sidebar"
import { useNavigate } from "@solidjs/router"
import { getOrCreateStorage } from "../utils/LocalStorage"

function Home() {
  const navigate = useNavigate()

  createEffect(() => {
    const [user, setUser] = getOrCreateStorage("user", null)
    
    if (user()) {
      console.log("User is logged in")
    } else {
      navigate("/login")
    }
  })

  return (
    <div class="container">
      <Sidebar />
      <div class="content">
        <h1>Welcome to my website</h1>
        <p>This is the main content area of the web page.</p>
      </div>
    </div>
  )
}

export default Home