import { useSelector, useDispatch } from "react-redux"
import Proyecto from "../../components/private/Proyecto"
import { resetTasks } from "../../redux/fautures/task.slice.js"
import { useEffect } from "react"
import toast from "react-hot-toast"

function Proyectos() {

  const { projects, chargingProjects } = useSelector(state => state.project)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetTasks())
  }, [])
  
  
  if (chargingProjects) return 
  return (
    <div id="Proyectos">
      {projects.length === 0 ? (
        <h1 className="legend" style={{textAlign:"center"}}>No projects yet</h1>
      ) : (
        <>
          <h1 className="legend">Projects</h1>
          <ul>
            {projects.map(project => (
              <Proyecto 
                key={project._id}
                project={project}/>
              ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Proyectos