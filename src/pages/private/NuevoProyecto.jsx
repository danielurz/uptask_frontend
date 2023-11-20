import { useSelector, useDispatch } from "react-redux"
import { mutatingProject,addProject,resetProject } from "../../redux/fautures/project.slice.js"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function NuevoProyecto() {

  const {project} = useSelector(state => state.project)
  const {userData} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleForm = async e => {
    e.preventDefault()
    // ----------- Formulario controlado -----------

    const VALUES = Object.values(project)

    if (VALUES.includes("") || VALUES.length < 4) return toast.error("All fields are required")

    try {
      const loadingToast = toast.loading("Adding project...")
      
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/project/crear`
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({...project,creadorId:userData._id}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      
      toast.dismiss(loadingToast)

      if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

      toast.success(response.success)
      dispatch(addProject({...project,_id:response.id,creadorId:userData._id}))
      dispatch(resetProject())

      setTimeout(() => {
        navigate("/")
      }, 500);

    } catch (error) {
        toast.error(`Client Error: ${error.message}`)
    }
  }


  const handleChange = e => {
    const {name,value} = e.target
    dispatch(mutatingProject({name,value}))
  }


  return (
    <div id="NuevoProyecto">
      <h1 className="hero">Create Project</h1>
      <form onSubmit={handleForm}>
        <div className="field">
          <label>Project Name</label>
          <input type="text" name="proyecto" onChange={handleChange} 
            value={project?.proyecto ?? ""} />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea name="descripcion" onChange={handleChange} 
            value={project?.descripcion ?? ""} />
        </div>
        <div className="field">
          <label>Due Date</label>
          <input type="date" name="fecha" onChange={handleChange} 
            value={project?.fecha ?? ""} />
        </div>
        <div className="field">
          <label>Client Name</label>
          <input type="text" name="cliente" onChange={handleChange} 
            value={project?.cliente ?? ""} />
        </div>
        <input type="submit" value="Create Project" className="smtBtn" />
      </form>
    </div>
  )
}

export default NuevoProyecto