import { FaWindowClose } from "react-icons/fa";
import { fillTask, showUpModal, addTask, resetTask, updateTask } from "../../redux/fautures/task.slice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

function ModalTask() {

    const dispatch = useDispatch()
    const {task} = useSelector(state => state.task)
    const {userData} = useSelector(state => state.auth)
    const {projectId} = useParams()

    const handleForm = async e => {
        e.preventDefault()
        
        const VALUES = Object.values(task)
        if (VALUES.includes("") || VALUES.length < 4) return toast.error("Completa todos los campos")

        if (!task?._id) {
          try {
              const loadingToast = toast.loading("Adding new task...")
              
              const url = `${import.meta.env.VITE_BACKEND_URL}/api/task/crear/${userData._id}`
              const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({...task,projectId}),
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(res => res.json())
              
              toast.dismiss(loadingToast)

              if (response?.error) return toast.error(response.error)
              if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)
  
              toast.success(response.success)
              dispatch(showUpModal(false))
              dispatch(addTask({...task,projectId,_id:response.id}))
              dispatch(resetTask())
  
          } catch (error) {
              toast.error(`Client Error: ${error.message}`)
          }
        } else {

          const {updatedAt,createdAt,projectId,estado,_id, ...updatedTask} = task

            try {
              const loadingToast = toast.loading("Editing task...")
              
              const url = `${import.meta.env.VITE_BACKEND_URL}/api/task/mutar/${task._id}/${projectId}`
              const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(updatedTask),
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(data => data.json())
              
              toast.dismiss(loadingToast)

              if (response?.error) return toast.error(response.error)
              if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

              toast.success(response.success)
              dispatch(showUpModal(false))
              dispatch(updateTask({...updatedTask,_id}))
              dispatch(resetTask())

            } catch (error) {
              toast.error(`Client Error: ${error.message}`)
            }
        }
        
    }

    const handleChange = e => {
        const {name,value} = e.target
        dispatch(fillTask({name,value}))
    }



  return (
    <form onSubmit={handleForm} className="modalEditTask">
        <div className="field">
          <label>Nombre tarea</label>
          <input type="text" name="tarea" 
            onChange={handleChange} value={task?.tarea ?? ""}/>
        </div>
        <div className="field">
          <label>Descripcion tarea</label>
          <textarea name="descripcion" 
            onChange={handleChange} value={task?.descripcion ?? ""}/>
        </div>
        <div className="field">
          <label>Fecha de entrega</label>
          <input type="date" name="fecha" 
            onChange={handleChange} value={task?.fecha ?? ""}/>
        </div>
        <div className="field">
          <label>Prioridad</label>
          <select name="prioridad" 
            onChange={handleChange} value={task?.prioridad ?? ""}>
            <option value="">-- Selecciona --</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <input type="submit" value={!task?._id ? "Crear Tarea" : "Editar Tarea"} className="smtBtn" />
        <FaWindowClose 
            onClick={() => {
              dispatch(resetTask())
              dispatch(showUpModal(false))
            }}
            className="closeIcon"/>
      </form>
  )
}

export default ModalTask