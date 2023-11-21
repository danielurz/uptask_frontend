import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { resetProjects } from "../../redux/fautures/project.slice.js"
import { resetUserData } from "../../redux/fautures/auth.slice.js"
import { HiMenu } from "react-icons/hi";
import { useEffect, useState } from "react";

function Header() {

    const dispatch = useDispatch()
    const [isMenuChecked, setIsMenuChecked] = useState(false)

    const hideRouting = e => {
        if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
            setIsMenuChecked(false)
        }
    }


    const cerrarSesion = () => {
        localStorage.removeItem("token")
        dispatch(resetProjects)
        dispatch(resetUserData)
        window.location.reload()
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 380) {
                setIsMenuChecked(true);
            } else {
                setIsMenuChecked(false);
            }
        };
        
        window.addEventListener("resize", handleResize);
    
        // Cleanup function
        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, [])
    

    return (
    <div id="Header">
        <div className="container">
            <div className="box">
                <div className="logo">
                    <p>UpTask</p>
                </div>
                <HiMenu className="menuIcon" onClick={() => setIsMenuChecked(!isMenuChecked)}/>
                <div className="actions" 
                onClick={hideRouting}
                style={isMenuChecked ? {display: "flex"} : {display: "none"}}>
                    <Link to="">Projects</Link>
                    <button onClick={cerrarSesion}>Log out</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Header