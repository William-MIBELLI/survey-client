import Button from '../../components/ui/Button'
import { Outlet, useNavigate } from 'react-router'

const DashboardLayout = () => {

  const navigate = useNavigate()
  return (
    <div className="bg-orange-100 w-full h-screen flex">
      <div className="bg-black w-1/3 border-r-4 border-black flex flex-col justify-start items-center gap-2 px-2">
        <p className="text-orange-500 titleFont text-5xl my-7">Qrafter</p>
        <div className="flex flex-col justify-center gap-3 font-semibold text-gray-400">
          <p className="hover:text-white cursor-pointer">
            Dashboard
          </p>
          <p>My surveys</p>
          <p>My Participation</p>
          <p>Invitations</p>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex border-b-2 bg-white border-black h-25 w-full items-center justify-between px-5">
          <p className="font-semibold text-4xl">Dashboard</p>
          <div>
            <Button popoverTarget='create-popover'  text="New survey" className="bg-white" />
            {/* <Button onClick={() => navigate("/dashboard/createSurvey")}  text="New survey" className="bg-white" /> */}
          </div>
        </div>
        <Outlet/>
      </div>
    </div>
  )
}

export default DashboardLayout