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
        if (VALUES.includes("") || VALUES.length < 4) return toast.error("Complete all fields")

        if (!task?._id) {
          const loadingToast = toast.loading("Adding new task...")
          
          try {
              const url = `${import.meta.env.VITE_BACKEND_URL}/api/task/crear/${userData._id}`
              const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({...task,projectId}),
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(res => res.json())
              
              if (response?.error) return toast.error(response.error)
              if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)
  
              toast.success(response.success)
              dispatch(showUpModal(false))
              dispatch(addTask({...task,projectId,_id:response.id}))
              dispatch(resetTask())
  
            } catch (error) {
              toast.error(`Client Error: ${error.message}`)
            } finally {
              toast.dismiss(loadingToast)
            }
        } else {

          const {updatedAt,createdAt,projectId,estado,_id, ...updatedTask} = task

          const loadingToast = toast.loading("Editing task...")
            try {
              
              const url = `${import.meta.env.VITE_BACKEND_URL}/api/task/mutar/${task._id}/${projectId}`
              const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(updatedTask),
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(data => data.json())
              
              if (response?.error) return toast.error(response.error)
              if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

              toast.success(response.success)
              dispatch(showUpModal(false))
              dispatch(updateTask({...updatedTask,_id}))
              dispatch(resetTask())

            } catch (error) {
              toast.error(`Client Error: ${error.message}`)
            } finally {
              toast.dismiss(loadingToast)
            }
        }
        
    }

    const handleChange = e => {
        const {name,value} = e.target
        dispatch(fillTask({name,value}))
    }



  return (
    <form onSubmit={handleForm} id="ModalEditTask">
        <div className="field">
          <label>Task Name</label>
          <input type="text" name="tarea" 
            onChange={handleChange} value={task?.tarea ?? ""}/>
        </div>
        <div className="field">
          <label>Task Description</label>
          <textarea name="descripcion" 
            onChange={handleChange} value={task?.descripcion ?? ""}/>
        </div>
        <div className="field">
          <label>Due Date</label>
          <input type="date" name="fecha" 
            onChange={handleChange} value={task?.fecha ?? ""}/>
        </div>
        <div className="field">
          <label>Priority</label>
          <select name="prioridad" 
            onChange={handleChange} value={task?.prioridad ?? ""}>
            <option value="">-- Select --</option>
            <option value="Baja">Low</option>
            <option value="Media">Medium</option>
            <option value="Alta">High</option>
          </select>
        </div>
        <input type="submit" value={!task?._id ? "Create Task" : "Edit Task"} className="smtBtn" />
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