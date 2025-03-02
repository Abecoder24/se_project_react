import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function ProtectedRoute({ isLoggedIn, children }) {
    const navigate = useNavigate()
    useEffect(()=>{
        if (!isLoggedIn) {
            navigate("/")
        }
    }, [])
    return (
        children
    )
}