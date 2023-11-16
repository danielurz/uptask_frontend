import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"

function Registrar() {

  const handleForm = async e => {
    e.preventDefault()

    const form = e.currentTarget
    const formdata = new FormData(form)

    const nombre = formdata.get("nombre")
    const email = formdata.get("email")
    const password = formdata.get("password")
    const rpassword = formdata.get("rpassword")

    if ([nombre,email,password].includes("")) return toast.error("Todos los campos son obligatorios")
    if (password.length < 6) return toast.error("el password es muy corto")
    if (password !== rpassword) return toast.error("los passwords no coinciden")

    try {
      const loadingToast = toast.loading("Loading...")
      
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/register`
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({nombre,email,password}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      
      toast.dismiss(loadingToast)
      
      if (response?.error) return toast.error(response.error)
      if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

      toast.success(response.success)
      form.reset()

    } catch (error) {
      toast.error(`Client Error: ${error.message}`)
    }
  }

  return (
    <div id="Registro">
      <div className="hero">
        <p><span>crea tu cuenta y administra tus </span>proyectos</p>
      </div>
        <form onSubmit={handleForm}>
          <div className="field">
            <label>NOMBRE</label>
            <input type="text" name="nombre" placeholder="Tu nombre" />
          </div>
          <div className="field">
            <label>EMAIL</label>
            <input type="text" name="email" placeholder="Email de registro" />
          </div>
          <div className="field">
            <label>PASSWORD</label>
            <input type="password" name="password" placeholder="Password de registro" />
          </div>
          <div className="field">
            <label>REPETIR PASSWORD</label>
            <input type="password" name="rpassword" placeholder="Repetir password" />
          </div>
          <input type="submit" value="CREAR CUENTA" className="smtBtn" />
        </form>
        <nav>
          <Link to="/">Ya tienes cuenta? Inicia sesion</Link>
          <Link to="/olvide-password">Olvide mi password</Link> 
        </nav>
    </div>
  )
}

export default Registrar