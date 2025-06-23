import { useState, useContext } from "react"
import AuthLayout from "../../components/layouts/AuthLayout"
import FormInput from "../../components/Inputs/FormInput"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"
import { UserContext } from "../../context/userContext"
import uploadImage from "../../utils/uploadImage"

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profilePic: null
  })
  const [error, setError] = useState(null)

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate()

  // handle SignUp 
  const handleSignUp = async (e) => {
    e.preventDefault()


    if (!formData.fullName) return setError("Please enter your name")
    if (!validateEmail (formData.email)) return setError("Please enter a valid email address")
    if (!formData.password) return setError("Please enter a password")
   
    setError("")

    // SignUp API Call
     try {

      let profileImageUrl = ""

      // Upload image if present 
      if (formData.profilePic) {
        const imgUploadResponse = await uploadImage(formData.profilePic)
        console.log(imgUploadResponse)
        profileImageUrl = imgUploadResponse.imageUrl  || ""
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        profileImageUrl
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
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create Account</h3>
        <p className="text-xs text-slate-700 mt-[15px] mb-6">
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={formData.profilePic} setImage={(file) => setFormData(prev => ({...prev, profilePic: file}))} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
            <FormInput
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange= {handleChange}
              label="Full Name"
              placeholder="John Doe"
            />
            <FormInput
              name="email"
              type="email"
              value={formData.email}
              onChange= {handleChange}
              label="Email Address"
              placeholder="johndoe@example.com"
            />
            <div className="col-span-2">
              <FormInput
                name="password"
                type="password"
                value={formData.password}
                onChange= {handleChange}
                label="Password"
                placeholder="Min 8 Characters"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">
              SIGN UP
            </button>

            <p className="text-[13px] text-slate-800 mt-3">
              Already have an account? {" "}
              <Link to='/login' className="font-medium text-primary underline">Login</Link>
            </p>
        </form>
      </div>
    </AuthLayout>
  )
}
export default SignUp