import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Sidebar() {

    const {userData} = useSelector(state => state.auth)

  return (
    <div id="Sidebar">
        <div className="container">
            <div className="greeting">
                <p>Hola {userData.nombre}</p>
            </div>
            <div className="action">
                <Link to="nuevo-proyecto">Nuevo proyecto</Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar