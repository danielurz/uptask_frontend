import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"


function NuevoPassword() {

  const {token} = useParams()

  const handleForm = async e => {
    e.preventDefault()

    const form = e.currentTarget
    const formdata = new FormData(form)

    const password = formdata.get("password")
    const rpassword = formdata.get("rpassword")

    if (password.length < 6) return toast.error("The password is too short")
    if (password !== rpassword) return toast.error("Passwords do not match")

    try {
      const url = `${import.meta.VITE_BACKEND_URL}/api/user/reset-password/${token}`
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({password}),
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
  }

  return (
    <div id="NuevoPassword">
      <div className="hero">
        <p><span>Reset your </span>password</p>
      </div>
        <form onSubmit={handleForm}>
          <div className="field">
            <label>PASSWORD</label>
            <input type="password" name="password" placeholder="Your new password" />
          </div>
          <div className="field">
            <label>REPEAT PASSWORD</label>
            <input type="password" name="rpassword" placeholder="Repeat password" />
          </div>
          <input type="submit" value="UPDATE PASSWORD" className="smtBtn" />
        </form>
    </div>
  )
}

export default NuevoPassword