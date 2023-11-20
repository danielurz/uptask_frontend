import { formatDate } from "../../functions/functions.js"
import { toast } from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux"
import { deleteTask, showUpModal, fillEditTask, updateState } from "../../redux/fautures/task.slice.js"


function Task({task,projectId,isCreator}) {
    
    const {tarea,fecha,descripcion,prioridad,estado} = task

    const {userData} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    const handleComplete = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/task/mutar/${task._id}/${projectId}`
            fetch(url, {
                method: "PATCH",
                body: JSON.stringify({boolean:!estado}),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            dispatch(updateState({estado:!estado,id:task._id}))
        } catch (error) {
            console.log(error.message)
        }
    }
    
    const handleEdit = async () => {
        dispatch(showUpModal(true))
        dispatch(fillEditTask(task))
    }

    const handleDelete = async () => {
        const confirmation = confirm("Desea eliminar esta tarea?")
        if (!confirmation) return

        const loadingToast = toast.loading("deleting task...")
        try {
            
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/task/mutar/${task._id}/${projectId}/${userData._id}`
            const response = await fetch(url,{method:"DELETE"}).then(data => data.json())
            
            if (response?.error) return toast.error(response.error)
            if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

            toast.success(response.success)
            dispatch(deleteTask(task._id))

        } catch (error) {
            toast.error(`Client Error: ${error.message}`)
        } finally {
            toast.dismiss(loadingToast)
        }
    }

  return (
    <li className="task">
        <div className="info">
            <p className="bold">{tarea}</p>    
            <p className="light">{descripcion}</p>    
            <p className="bold">{formatDate(fecha)}</p>
            <p className="light">Priority: {prioridad}</p>
        </div>    
        <div className="actions">
            <button 
                className={estado ? "completa" : "incompleta"} onClick={handleComplete}>
                {estado ? "Complete" : "Incomplete"}</button>
            {isCreator && (
                <>
                    <button 
                        className="edit" onClick={handleEdit}>
                        Edit</button>
                    <button 
                        className="delete" onClick={handleDelete}
                        >Delete</button>
                </>
            )}
        </div>
    </li>
  )
}

export default Task