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

    if ([nombre,email,password].includes("")) return toast.error("All fields are required")
    if (password.length < 6) return toast.error("Password is too short")
    if (password !== rpassword) return toast.error("Passwords do not match")

    const loadingToast = toast.loading("Loading...")
    
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/register`
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({nombre,email,password}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      
      
      if (response?.error) return toast.error(response.error)
      if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)
      
      toast.success(response.success)
      form.reset()
      
    } catch (error) {
      toast.error(`Client Error: ${error.message}`)
    }
    finally {
      toast.dismiss(loadingToast)
    }
  }

  return (
    <div id="Registro">
      <div className="hero">
        <p><span>Create your account and manage your </span>projects</p>
      </div>
        <form onSubmit={handleForm}>
          <div className="field">
            <label>NAME</label>
            <input type="text" name="nombre" placeholder="Your name" />
          </div>
          <div className="field">
            <label>EMAIL</label>
            <input type="text" name="email" placeholder="Registration email" />
          </div>
          <div className="field">
            <label>PASSWORD</label>
            <input type="password" name="password" placeholder="Registration password" />
          </div>
          <div className="field">
            <label>REPEAT PASSWORD</label>
            <input type="password" name="rpassword" placeholder="Repeat password" />
          </div>
          <input type="submit" value="CREATE ACCOUNT" className="smtBtn" />
        </form>
        <nav>
          <Link to="/">Already have an account? Log in</Link>
          <Link to="/forgot-password">Forgot my password</Link> 
        </nav>
    </div>
  )
}

export default Registrar