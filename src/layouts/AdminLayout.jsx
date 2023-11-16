import { Outlet, Navigate } from "react-router-dom"
import { useSelector} from "react-redux"
import ModalProject from "../components/private/ModalProject";
import Header from "../components/private/Header"
import Sidebar from "../components/private/Sidebar"
import ModalTask from "../components/private/ModalTask";


function AdminLayout() {

    const {userData,chargingUserData} = useSelector(state => state.auth)
    const {project,projects} = useSelector(state => state.project)
    const {taskModal} = useSelector(state => state.task)

    if (chargingUserData) return null
    return (
    <>
        {userData?._id ? (
            <div id="Admin" className={project?._id || taskModal ? "editModal" : ""}>
                <Header/>
                <main id="Main">
                    <Sidebar/>
                    <div id="AdminOutlet">
                        <Outlet/> 
                    </div>
                </main>
                {project?._id && (
                    <ModalProject
                        project={project}
                        projects={projects}
                        userId={userData._id}/>
                )}
                {taskModal && (
                    <ModalTask/>
                )}
            </div>
        ) : (
            <Navigate to="/" />
        )}
    </>
    )
}

export default AdminLayout