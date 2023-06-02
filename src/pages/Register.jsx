import './auth.module.css'
import Api from "../utils/Api"
import { createSignal } from 'solid-js'
import { useNavigate } from "@solidjs/router"
import { getOrCreateStorage } from "../utils/LocalStorage"

function Register() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = getOrCreateStorage("user", null)
  const [value, setValue] = createSignal({
    username: "",
    password: "",
    confirm_password: ""
  })

  const handleChange = (e) => {
    setValue({
      ...value(),
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(value());
    
    if (value().password !== value().confirm_password) {
      alert("Password and Confirm Password do not match")
      return
    }

    const user = {
      username: value().username,
      password: value().password,
      role: "user"
    }

    Api.post("/register", user, { withCredentials: false })
      .then((res) => {
        const data = res.data

        if (data.status == "success") {
          alert("Login successful")

          handleLogin(data.data[0])
        } else if (data.status == "error") {
          alert("Login failed due " + data.message)
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

  if (currentUser()) {
    navigate("/")
    return
  }

  return (
    <>
      <h1>Register</h1>
      <form>
        <label for="new_username">Username:</label>
        <input type="text" id="username" name="username" onchange={handleChange}></input><br/>

        <label for="new_password">Password:</label>
        <input type="password" id="password" name="password" onchange={handleChange}></input><br/>

        <label for="confirm_password">Confirm Password:</label>
        <input type="password" id="confirm_password" name="confirm_password" onchange={handleChange}></input><br/>

        <input type="submit" value="Register" onclick={handleSubmit}></input>
      </form>
    </>
  )
}

export default Register