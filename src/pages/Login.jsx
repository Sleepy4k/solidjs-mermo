import axios from 'axios'
import './auth.module.css'
import { createSignal } from 'solid-js'
import { useNavigate } from "@solidjs/router"
import { getOrCreateStorage } from "../utils/LocalStorage"

function Login() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = getOrCreateStorage("user", null)
  const [value, setValue] = createSignal({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setValue({
      ...value(),
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    axios.post("http://0.0.0.0:7004/login", value())
      .then((res) => {
        const data = res.data

        if (data.status == "OK") {
          alert("Login successful")

          handleLogin(data.data[0])
        } else if (data.status == "ERROR") {
          alert("Login failed due " + data.info)
        } else {
          alert("Something went wrong")
        }

        console.log(data);
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

  const handleLogin = (user) => {
    setCurrentUser({
      id: user.id,
      username: user.username,
      role: user.role,
    })
    // document.cookie = `auth_jwt_secret=${user[0].token}; path=/;`
    navigate("/")
  }

  if (currentUser()) {
    navigate("/")

    return
  }

  return (
    <>
      <h1>Login</h1>
      <form>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" onchange={handleChange}></input><br/>
    
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" onchange={handleChange}></input><br/>
    
        <input type="submit" value="Login" onclick={handleSubmit}></input>
      </form>
    </>
  )
}

export default Login