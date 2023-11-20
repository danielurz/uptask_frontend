import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

function Proyecto({project}) {
  const {_id, proyecto, cliente, creadorId} = project

  const {userData} = useSelector(state => state.auth)
  const isCreator = creadorId === userData._id

  return (
    <li className="proyecto">
      <div className="info">
        <p>{proyecto}</p>
        <p>{cliente}</p>
        {!isCreator && (
          <legend>collaborator</legend>
        )}
      </div>
      <div className="action">
        <Link to={`proyecto/${_id}`}>View project</Link>
      </div>
    </li>
  )
}

export default Proyecto