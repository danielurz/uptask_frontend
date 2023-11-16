import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function PublicLayout() {

  const {userData,chargingUserData} = useSelector(({auth}) => auth)

  if (chargingUserData) return
  return (
    <>
      {userData?._id ? (
          <Navigate to="/admin"/>
        ) : (
          <main id="Public">
            <Outlet/>
          </main>
        )}
    </>
  )
}

export default PublicLayout