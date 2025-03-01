import { createContext } from "react"

const MyFunctionContext = createContext({
    handleAddClick: () => { },
    handleEditProfileClick: () => { },
    handleSignOut: () => { }
})



export { MyFunctionContext }