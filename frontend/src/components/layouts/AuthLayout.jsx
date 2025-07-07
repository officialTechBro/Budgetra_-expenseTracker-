import AuthImage from '../../assets/authImage.jpg'


const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Budgetra</h2>
        {children}
      </div>
      <div className="hidden md:flex w-[40vw] h-screen items-center justify-center ">
            <img src={AuthImage} alt="AuthImg" className='w-full h-full object-cover object-center' />
        </div>
    </div>
  )
}
export default AuthLayout