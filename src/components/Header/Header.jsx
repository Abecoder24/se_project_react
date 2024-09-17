import "./Header.css"
import logo from "../../assets/Logo.svg"
import avatar from "../../assets/Avatar.svg"
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
    return (
        <header className="header">
            <Link to="/">
                <img src={logo} alt="Logo" className="header__logo" />
            </Link>
            <p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
            <div className="header__button-container">
                <ToggleSwitch />
                <button className="header__add-clothes-btn" onClick={handleAddClick}>+ Add clothes</button>
                
                <Link to="/profile" className="header__link">
                    <div className="header__user-container">
                        <p className="header__username">Abraham Tongi</p>
                        <img src={avatar} alt="Avatar" className="header__avatar" />
                    </div>
                </Link>
            </div>
        </header>
    )
}
export default Header