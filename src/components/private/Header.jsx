import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { autenticacion } from "../../functions/functions.js"
import { resetProjects } from "../../redux/fautures/project.slice.js"
import { resetUserData } from "../../redux/fautures/auth.slice.js"

function Header() {

    const dispatch = useDispatch()

    const cerrarSesion = () => {
        localStorage.removeItem("token")
        dispatch(resetProjects)
        dispatch(resetUserData)
        window.location.reload()
    }

  return (
    <div id="Header">
        <div className="container">
            <div className="box">
                <div className="logo">
                    <p>UpTask</p>
                </div>
                <div className="actions">
                    <Link to="">Proyectos</Link>
                    <button onClick={cerrarSesion}>Cerrar Sesion</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header