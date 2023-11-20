import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Sidebar() {

    const {userData} = useSelector(state => state.auth)

  return (
    <div id="Sidebar">
        <div className="container">
            <div className="greeting">
                <p>Hello {userData.nombre}</p>
            </div>
            <div className="action">
                <Link to="nuevo-proyecto">New project</Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar