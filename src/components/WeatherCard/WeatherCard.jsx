import { weatherOptions, defaultWeatherOptions } from "../../utils/constants"
import "./WeatherCard.css"
import { CurrentTemperatureUnitContext } from "../../utils/contexts/CurrentTemperatureUnitContext"
import { useContext } from "react"
function WeatherCard({ weatherData }) {
    const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext)
    const filteredData = weatherOptions.filter((option) => {
        return (
            option.day === weatherData.isDay && option.condition === weatherData.condition
        )
    })

    let weatherOption

    if (filteredData.length === 0) {
        weatherOption = defaultWeatherOptions[weatherData?.isDay ? "day" : "night"]
    } else {
        weatherOption = filteredData[0]
    }


    return <section className="weather-card">
        <p className="weather-card__temp">{weatherData.temp[currentTemperatureUnit]} &deg; {currentTemperatureUnit}</p>
        <img src={weatherOption?.url} alt={`Card showing ${weatherOption?.isDay ? "Day" : "night"} ${weatherOption?.condition != undefined ? weatherOption?.condition : ""} weather`} className="weather-card__image" />
    </section>
}
export default WeatherCard