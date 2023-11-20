import { updateCharging,updateUserData } from "../redux/fautures/auth.slice.js"
import { mutateChargingProjects,getProjects } from "../redux/fautures/project.slice.js"


export const autenticacion = async dispatch => {

    const token = localStorage.getItem("token")
    if (!token) return dispatch(updateCharging(false))

    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/autentication`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => res.json())

        if (response?.error) return console.log(response.error)
        if (response?.serverError) return console.log(`Server Error: ${response.serverError}`)

        dispatch(updateUserData(response))
        if (response?._id) fetchingProjects(dispatch,response._id)

    } catch (error) {
        console.log(`Client Error: ${error.message}`)
    } finally {
        dispatch(updateCharging(false))
    }
}


const fetchingProjects = async (dispatch,userId) => {
    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/project/obtener/${userId}`
        const response = await fetch(url).then(res => res.json())

        if (response?.serverError) return console.error(`Server Error: ${response.serverError}`)
        
        dispatch(getProjects(response))
        
    } catch (error) {
        console.log(`Client Error: ${error.message}`)
    } finally {
        dispatch(mutateChargingProjects(false))
    }
}


export const formatDate = fecha => {
    const newDate = new Date(fecha.split("T")[0].split("-"))
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }

    return newDate.toLocaleDateString("es-ES", options)
}