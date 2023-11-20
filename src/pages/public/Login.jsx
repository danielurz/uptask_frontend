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

    if ([email,password].includes("")) return toast.error("All fields are required")

    const loadingToast = toast.loading("Logging in...")
    
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/login`
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({email,password}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())

      if (response?.error) return toast.error(response.error);
      if (response?.serverError) return toast.error(response.serverError);

      localStorage.setItem("token",response.token);
      autenticacion(dispatch);
      form.reset();

    } catch (error) {
      toast.error(`Client Error: ${error.message}`)
    }
    finally {
      toast.dismiss(loadingToast)
    }
  }

  return (
    <div id="Login">
      <div className="hero">
        <p><span>log in and manage your </span>projects</p>
      </div>
        <form onSubmit={handleForm}>
          <div className="field">
            <label>Email</label>
            <input type="text" name="email" placeholder="Registration Email" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Registration Password" />
          </div>
          <input type="submit" value="LOG IN" className="smtBtn" />
        </form>
        <nav>
          <Link to="/register">Don't have an account? Register</Link>
          <Link to="/forgot-password">Forgot my password</Link> 
        </nav>
    </div>
  )
}

export default Login