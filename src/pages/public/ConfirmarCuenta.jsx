import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

function ConfirmarCuenta() {

  const checkedToken = useRef(false)
  const [isValidToken, setIsValidToken] = useState(null)
  const { token } = useParams()

  useEffect(() => {
    if (!checkedToken.current) {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/confirmar/${token}`
        fetch(url)
          .then(data => data.json())
          .then(response => {
            if (response?.error) setIsValidToken(false)
            else if (response?.success) setIsValidToken(true)
          })
      } catch (error) {
          console.log(error.message)
      } 

      checkedToken.current = true
    }
  }, [])
  


  if (isValidToken === null) return
  return (
    isValidToken ? <p>Cuenta Confirmada</p> : <p>Token invalido</p>
  )
}

export default ConfirmarCuenta