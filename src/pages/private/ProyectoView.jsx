import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FaPencilAlt, FaTrash, FaPlusCircle, FaUserPlus } from "react-icons/fa";
import { editProject, deleteProject } from "../../redux/fautures/project.slice.js";
import { showUpModal } from "../../redux/fautures/task.slice.js";
import { toast } from "react-hot-toast";
import Tasks from "../../components/private/Tasks.jsx";
import { formatDate } from "../../functions/functions.js";
import Colaboradores from "../../components/private/Colaboradores.jsx";
import { useEffect, useState, useMemo } from "react";

function ProyectoView() {

    const {projectId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showCol, setShowCol] = useState(false)

    const {projects,chargingProjects} = useSelector(state => state.project)
    const {userData} = useSelector(state => state.auth)
    
    const thisProject = projects.find(({_id}) => _id === projectId)
    
    const isCreator = thisProject?.creadorId === userData._id

    
    const handleDeleteProject = async () => {
        const confirmation = confirm("Deseas eliminar este proyecto?")
        if (!confirmation) return
        
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/project/mutar/${_id}/${userData._id}`
            const response = await fetch(url, {method:"DELETE"}).then(res => res.json())
            
            if (response?.error) return toast.error(response.error)
            if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)
            
            toast.success(response.success)
            dispatch(deleteProject(_id))
            navigate("/")
            
        } catch (error) {
            toast.error(`Client Error: ${error.message}`)
        } 
    }
    
    
    if (chargingProjects) return 
    if (!thisProject) return <h1>Error: No existe un proyecto con este ID</h1>
    const {proyecto,cliente,descripcion,fecha,_id} = thisProject
    return (
        <div id="ProjectView">
            <div className="project">
                <div className="hero">
                    <h1>{proyecto}</h1>
                    {isCreator && (
                        <div className="actions">
                            <button onClick={() => dispatch(editProject(thisProject))}>
                                <FaPencilAlt/> Editar</button>
                            <button onClick={handleDeleteProject}>
                                <FaTrash/> Eliminar</button>
                        </div>    
                    )}
                </div>
                {isCreator && (
                    <button className="newTask" onClick={() => dispatch(showUpModal(true))}>
                        <FaPlusCircle/> 
                        <span>Nueva tarea</span>
                    </button>
                )}
                <p><span>Cliente: </span>{cliente}</p>
                <p><span>Fecha de entrega: </span>{formatDate(fecha)}</p>
                <p><span>Descripcion del proyecto: </span>{descripcion}</p>
            </div>
            <Tasks
                projectId={projectId}
                isCreator={isCreator} />
            {isCreator && (
                <>
                    <button className="addColBtn" onClick={() => setShowCol(!showCol)}>
                        <FaUserPlus/>
                    </button>
                        <Colaboradores
                            projectId={projectId}
                            showCol={showCol}/>    
                </>
            )}
        </div>
    )
}

export default ProyectoView