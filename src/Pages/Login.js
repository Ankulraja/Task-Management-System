import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="text-black flex flex-col justify-center items-center w-screen h-screen">
      Login Page up coming soon..
      <Link to={"/dashboard/dash"} className="text-blue-700">
      Click here
      </Link>
      to see working page
      </div> 
  )
}
export default Login