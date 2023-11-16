import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"

function OlvidePassword() {

  const handleForm = async e => {
    e.preventDefault()

    const form = e.currentTarget
    const formdata = new FormData(form)

    const email = formdata.get("email")

    if (email === "") return toast.error("Completa el campo")

    try {
      const url = `${import.meta.VITE_BACKEND_URL}/api/user/reset-password`
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({email}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())

      if (response.error) return toast.error(response.error)
      if (response.serverError) return toast.error(`Server Error: ${response.serverError}`)

      toast.success(response.success)
      form.reset()

    } catch (error) {
      toast.error(`Client Error: ${error.message}`)
    }
  }

  return (
    <div id="OlvidePassword">
      <div className="hero">
        <p><span>recupera el acceso </span>a tu cuenta</p>
      </div>
        <form onSubmit={handleForm}>
          <div className="field">
            <label>Email</label>
            <input type="text" name="email" placeholder="Email de registro" />
          </div>
          <input type="submit" value="ENVIAR INSTRUCCIONES" className="smtBtn" />
        </form>
        <nav>
          <Link to="/">Ya tienes cuenta? Inicia sesion</Link>
          <Link to="/registrar">No tienes cuenta? Registrate</Link>
        </nav>
    </div>
  )
}

export default OlvidePassword