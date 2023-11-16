import { useState, useEffect } from "react";
import { FaSearch, FaUserPlus, FaUserTimes, FaAngleDoubleLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function Colaboradores({showCol,projectId}) {

  const [colaboradores, setColaboradores] = useState([])
  const [colaborador, setColaborador] = useState({})

  const {userData} = useSelector(state => state.auth)
  const {projects} = useSelector(state => state.project)



  const getAllColabs = async () => {
    const thisProject = projects.find(({_id}) => _id === projectId)

    if (thisProject.creadorId === userData._id) {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/api/project/colaboradores/${projectId}`
          const response = await fetch(url).then(data => data.json())
          
          if (response?.serverError) return console.error(`Server Error: ${response.serverError}`)

          setColaboradores(response)

        } catch (error) {
          console.log(error.message)
        }
    }
  }  


  
  useEffect(() => {
    getAllColabs()
  }, [])
  


  const handleForm = async e => {
    e.preventDefault()
    
    const form = e.currentTarget
    const formdata = new FormData(form)

    const email = formdata.get("email")

    try {
      const loadingToast = toast.loading("Searching...")
      
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/project/colaborador/${email}/${userData._id}`
      const response = await fetch(url).then(data => data.json())
      
      if (response?.error) return toast.error(response.error)
      if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)
      
      toast.dismiss(loadingToast)

      setColaborador(prev => {
        let obj = {}
        for (let key in response) {
          obj[key] = response[key]
        }
        return obj
      })
      form.reset()

    } catch (error) {
      toast.error(`Client Error: ${error.message}`)
    }
  }



  const addColaborador = async () => {
    try {
      const loadingToast = toast.loading("adding collaborator...")
      
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/project/colaborador/${projectId}/${userData._id}`
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({colId:colaborador.id}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(data => data.json())
      
      toast.dismiss(loadingToast)

      if (response?.error) return toast.error(response.error)
      if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

      toast.success(response.success)
      setColaboradores([...colaboradores,colaborador])
      setColaborador({})

    } catch (error) {
      toast.error(`Client Error: ${error.message}`)
    }
  }

  

  const handleDeleteCol = async idCol => {
    const confirmation = confirm("Deseas eliminar este colaborador?")
    if (!confirmation) return
    
    try {
      const loadingToast = toast.loading("deleting collaborator...")
      
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/project/colaborador/${idCol}/${projectId}`
      const response = await fetch(url,{method: "DELETE"}).then(data => data.json())

      toast.dismiss(loadingToast)

      if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

      toast.success(response.success)
      setColaboradores(prev => prev.filter(({id}) => id !== idCol))

    } catch (error) {
      toast.error(`Client Error: ${error.message}`)
    }
  }
  


  return (
    <div id="ColBox" className={showCol ? "showCol" : ""}>
        <form onSubmit={handleForm}>
          <input type="text" className="txtInput" name="email" 
            placeholder="Busca colaborador..."  />
          <button type="submit" className="smtBtn">
          <FaSearch/>
          </button>
        </form>
        <div className="box">
          {!colaborador?.id ? (
              <>
                <h3>{colaboradores.length > 0 ? "Colaboradores" : "Aun no hay colaboradores"}</h3>
                {colaboradores.length > 0 && (
                  <ul id="ListadoCol">
                    {colaboradores.map(col => {
                      const {nombre,email,id} = col
                      return (
                        <li key={id} className="col">
                          <div className="info">
                            <p className="name">{nombre}</p>
                            <p className="email">{email}</p>
                          </div>
                          <button className="deleteCol" 
                            onClick={() => handleDeleteCol(id)}>
                            <FaUserTimes/>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                  )}
              </>
            ) : (
              <div className="col">
                <div className="info">
                  <p className="name">{colaborador.nombre}</p>
                  <p className="email">{colaborador.email}</p>
                </div>
                <button onClick={addColaborador}>
                  <FaUserPlus/>
                </button>
            </div>
          )}
        </div>
        {colaborador?.id && (
          <button className="goBack" onClick={() => setColaborador({})}>
            <FaAngleDoubleLeft/>
          </button>
        )}
    </div>
  )
}

export default Colaboradores