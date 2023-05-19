import axios from 'axios'
import './auth.module.css'
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

    axios.post("http://0.0.0.0:7004/register", user)
      .then((res) => {
        const data = res.data

        if (data.status == "OK") {
          alert("Register successful")

          navigate("/login")
        } else if (data.status == "ERROR") {
          alert("Register failed due " + data.info)
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