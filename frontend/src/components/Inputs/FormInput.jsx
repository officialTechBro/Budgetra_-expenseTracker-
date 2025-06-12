import { useState } from "react"
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const FormInput = ({value, type, name, placeholder, onChange, label }) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
  return (
    <div>
        <label htmlFor="email" className="text-[13px] text-slate-800">{label}</label>

        <div className="input-box">
            <input 
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
                className="w-full bg-transparent outline-none"
            />

            {type === 'password' && (
                <>
                    {showPassword ? (
                        <FaRegEye
                            size={22}
                            className="text-primary cursor-pointer"
                            onClick={() => toggleShowPassword()}
                        />
                    ) : (
                        <FaRegEyeSlash
                            size={22}
                            className="text-slate-400 cursor-pointer"
                            onClick={() => toggleShowPassword()}
                        />
                    )}
                </>
            )}
        </div>
    </div>
  )
}
export default FormInput