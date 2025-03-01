export default function ProtectedRoute({ isLoggedIn, children }) {
    if (!isLoggedIn) {
        return <h1>Please login first</h1>
    }
    return (
        children
    )
}