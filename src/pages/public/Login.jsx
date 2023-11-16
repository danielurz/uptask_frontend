import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { autenticacion } from "../../functions/functions.js"

function Login() {

  const dispatch = useDispatch()

  const handleForm = async e => {
    e.preventDefault()

    const form = e.currentTarget
    const formdata = new FormData(form)

    const email = formdata.get("email")
    const password = formdata.get("password")

    if ([email,password].includes("")) return toast.error("Todos los campos son obligatorios")

    try {
      const loadingToast = toast.loading("Logging in...")

      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/login`
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({email,password}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())

      toast.dismiss(loadingToast)

      if (response?.error) return toast.error(response.error);
      if (response?.serverError) return toast.error(response.serverError);

      localStorage.setItem("token",response.token);
      autenticacion(dispatch);
      form.reset();

    } catch (error) {
      toast.error(`Client Error: ${error.message}`)
    }
  }

  return (
    <div id="Login">
      <div className="hero">
        <p><span>inicia sesion y administra tus </span>proyectos</p>
      </div>
        <form onSubmit={handleForm}>
          <div className="field">
            <label>Email</label>
            <input type="text" name="email" placeholder="Email de registro" />
          </div>
          <div className="field">
            <label>PASSWORD</label>
            <input type="password" name="password" placeholder="Password de registro" />
          </div>
          <input type="submit" value="INICIAR SESION" className="smtBtn" />
        </form>
        <nav>
          <Link to="/registrar">No tienes cuenta? Registrate</Link>
          <Link to="/olvide-password">Olvide mi password</Link> 
        </nav>
    </div>
  )
}

export default Login