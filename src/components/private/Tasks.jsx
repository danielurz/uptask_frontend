import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fillTasks } from "../../redux/fautures/task.slice.js"
import Task from "./Task.jsx"
import { useState } from "react"
import toast from "react-hot-toast"

function Tasks({projectId,isCreator}) {

    const {tasks} = useSelector(state => state.task)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const obtenerTareas = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/task/obtener/${projectId}`
                const response = await fetch(url).then(res => res.json())
    
                if (response?.serverError) return console.error(response.serverError)
                dispatch(fillTasks(response))
            
            } catch (error) {
                console.error(error.message)
            } 

            setLoading(false)
        }

        obtenerTareas()
    }, [])



    if (loading) return 
    return (
        <>
            {tasks.length === 0 ? (
                <>
                    <h2 style={{textAlign: "center", marginTop: "50px"}}>There are no tasks yet</h2>
                </>
            ) : (
                <ul id="Tasks">
                    {tasks.map(task => {
                        return (
                            <Task
                                projectId={projectId}
                                key={task._id}
                                isCreator={isCreator}
                                task={task} />
                        )
                    })}
                </ul>
            )}
        </>
    )
}

export default Tasks