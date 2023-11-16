import { FaWindowClose } from "react-icons/fa";
import { resetProject,mutatingProject,updateProject } from "../../redux/fautures/project.slice.js";
import { useDispatch } from "react-redux";
import {toast} from "react-hot-toast"


function ModalProject({project,userId,projects}) {

    const dispatch = useDispatch()

    const handleForm = async e => {
        e.preventDefault()

        const VALUES = Object.values(project)

        if (VALUES.includes("")) return toast.error("Completa todos los campos")

        const {_id,creadorId,colaboradores,createdAt,updatedAt, ...updatedProject} = project

        const foundProject = projects.find(({_id}) => _id === project._id)
        let hasntMadeChanges = true
        
        for (let key in updatedProject) {
            if (updatedProject[key] !== foundProject[key]) {
                hasntMadeChanges = false
            }
        }

        if (hasntMadeChanges) return toast.error("No has hecho ningun cambio")
        
        try {
            const loadingToast = toast.loading("editing project...")
            
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/project/mutar/${project._id}/${userId}`
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(updatedProject),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
            
            toast.dismiss(loadingToast)

            if (response?.error) return toast.error(response.error)
            if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

            toast.success(response.success)
            dispatch(updateProject({...updatedProject,_id:project._id,creadorId}))
            dispatch(resetProject())

        } catch (error) {
            toast.error(`Client Error: ${error.message}`)
        }
    }

    const handleChange = e => {
        const {name,value} = e.target
        dispatch(mutatingProject({name,value}))
    }

  return (
    <form onSubmit={handleForm} className="modalEdit">
        <div className="field">
          <label>Nombre proyecto</label>
          <input type="text" name="proyecto" onChange={handleChange} 
            value={project?.proyecto ?? ""} />
        </div>
        <div className="field">
          <label>Descripcion</label>
          <textarea name="descripcion" onChange={handleChange} 
            value={project?.descripcion ?? ""} />
        </div>
        <div className="field">
          <label>Fecha entrega</label>
          <input type="date" name="fecha" onChange={handleChange} 
            value={project?.fecha ?? ""} />
        </div>
        <div className="field">
          <label>Nombre cliente</label>
          <input type="text" name="cliente" onChange={handleChange} 
            value={project?.cliente ?? ""} />
        </div>
        <input type="submit" value="Editar proyecto" className="smtBtn" />
        <FaWindowClose 
            onClick={() => dispatch(resetProject())}
            className="closeIcon"/>
      </form>
  )
}

export default ModalProject