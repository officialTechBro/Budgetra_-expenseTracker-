import { useContext, useState } from "react"
import AuthLayout from "../../components/layouts/AuthLayout"
import FormInput from "../../components/Inputs/FormInput"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"
import { UserContext } from "../../context/userContext"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate()

  // handle Login 
  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail (formData.email)) return setError("Please enter a valid email address")
    if (!formData.password) return setError("Please enter a password")
    
    setError("")

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
      })

      const {token, user} = response.data
      if (token) {
        localStorage.setItem("token", token)
        updateUser(user)
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again")
      }
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[15px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <FormInput
            name="email"
            type="email"
            value={formData.email}
            onChange= {handleChange}
            label="Email Address"
            placeholder="johndoe@example.com"
          />
          <FormInput
            name="password"
            type="password"
            value={formData.password}
            onChange= {handleChange}
            label="Password"
            placeholder="Min 8 Characters"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Dont have an account {" "}
            <Link to='/signup' className="font-medium text-primary underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}
export default Login