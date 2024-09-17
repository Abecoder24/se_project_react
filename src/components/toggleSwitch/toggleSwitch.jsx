import { useContext } from "react"
import { CurrentTemperatureUnitContext } from "../../utils/contexts/CurrentTemperatureUnitContext"
import './toggleSwitch.css'
const ToggleSwitch = () => {

    const {currentTemperatureUnit, handleToggleSwitchChange} = useContext(CurrentTemperatureUnitContext)
    
    return <label htmlFor="theTempCheckBox" className="switch">
        <input
            type="checkbox"
            name=""
            id="theTempCheckBox"
            className="switch__box"
            onChange={handleToggleSwitchChange}
        />
        <span className={`switch__slider ${currentTemperatureUnit === "F" ? "switch__slider-F" : "switch__slider-C"}`}></span>
        <p className={`switch__temp-F ${currentTemperatureUnit === "F" && "switch__active"}`}>F</p>
        <p className={`switch__temp-C ${currentTemperatureUnit === "C" && "switch__active"}`}>C</p>
    </label>
}

export default ToggleSwitch