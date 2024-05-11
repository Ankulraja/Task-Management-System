import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="text-black flex flex-col justify-center items-center w-screen h-screen">
      Home Page up coming soon..
      <Link to={"/dashboard/dash"} className="text-blue-700">
      Click here
      </Link>
      to see working page
      </div> 
  )
}
export default Home