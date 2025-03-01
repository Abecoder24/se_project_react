import "./Header.css"
import logo from "../../assets/Logo.svg"
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";

function Header({ handleButtonsClick, weatherData, isLoggedIn }) {
    const { handleAddClick, handleLoginClick, handleRegisterClick } = handleButtonsClick
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
    const currentUser = useContext(CurrentUserContext)
    return (
        <header className="header">
            <Link to="/">
                <img src={logo} alt="Logo" className="header__logo" />
            </Link>
            <p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
            <div className="header__button-container">
                <ToggleSwitch />

                {isLoggedIn ?
                    <>
                        <button className="header__add-clothes-btn" onClick={handleAddClick}>+ Add clothes</button>
                        <Link to="/profile" className="header__link">
                            <div className="header__user-container">
                                <p className="header__username">{currentUser.name}</p>
                                <img src={currentUser.avatar} alt="Avatar" className="header__avatar" />
                            </div>
                        </Link>
                    </>
                    : <>
                        <button className="header__login-btn" onClick={handleLoginClick}>Login</button>
                        <button className="header__register-btn" onClick={handleRegisterClick}>Register</button>
                    </>}
            </div>
        </header>
    )
}
export default Header