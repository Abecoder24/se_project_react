import './SideBar.css';
import DefaultAvatar from "../../assets/Avatar.svg"

const SideBar = () => {
    return <div className="sidebar">
        <img className="sidebar__avatar" src={DefaultAvatar} alt="" />
        <p className="sidebar__username">Abraham Tongi</p>
    </div>
}
export default SideBar