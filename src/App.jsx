import {BrowserRouter, Routes, Route} from "react-router-dom"
import { autenticacion } from './functions/functions.js'
import { useDispatch } from 'react-redux'
import { useEffect } from "react"
// PUblic
import PublicLayout from './layouts/PublicLayout'
import Login from './pages/public/Login'
import Registrar from './pages/public/Registrar'
import OlvidePassword from './pages/public/OlvidePassword'
import NuevoPassword from './pages/public/NuevoPassword'
import ConfirmarCuenta from './pages/public/ConfirmarCuenta'
// Private
import AdminLayout from './layouts/AdminLayout'
import Proyectos from './pages/private/Proyectos'
import NuevoProyecto from './pages/private/NuevoProyecto'
import ProyectoView from "./pages/private/ProyectoView.jsx"


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    autenticacion(dispatch)
  }, [])
  

  return (
    <BrowserRouter>
      <Routes>
        {/* AREA PUBLICA */}
        <Route path='/' element={<PublicLayout/>}>
          <Route index element={<Login/>} />
          <Route path='register' element={<Registrar/>} />
          <Route path='forgot-password' element={<OlvidePassword/>} />
          <Route path='new-password/:token' element={<NuevoPassword/>} />
          <Route path='confirmar-cuenta/:token' element={<ConfirmarCuenta/>} />
        </Route>
        {/* AREA PRIVADA */}
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index element={<Proyectos/>} />
          <Route path='nuevo-proyecto' element={<NuevoProyecto/>} />
          <Route path='proyecto/:projectId' element={<ProyectoView/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
