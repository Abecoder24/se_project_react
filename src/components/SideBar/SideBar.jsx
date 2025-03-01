import './SideBar.css';
import { useContext } from 'react';
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext"
import { MyFunctionContext } from '../../utils/contexts/MyFunctionContext';
const SideBar = () => {
    const currentUser = useContext(CurrentUserContext)
    const { handleEditProfileClick, handleSignOut } = useContext(MyFunctionContext)
    return (
        <div className="sidebar">
            <div className='sidebar__userinfo'>
                <img className="sidebar__avatar" src={currentUser.avatar} alt="User Avatar" />
                <p className="sidebar__username">{currentUser.name}</p>
            </div>
            <ul className="sidebar__btns">
                <li onClick={handleEditProfileClick}>
                    Change Profile Data
                </li>
                <li onClick={handleSignOut}>
                    Logout
                </li>
            </ul>
        </div>
    )
}
export default SideBar