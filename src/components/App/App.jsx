import { useEffect, useState } from 'react'
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ItemModal from '../ItemModal/ItemModal'
import { getWeather, filterWeatherData } from '../../utils/weatherApi'
import { coordinates, APIKey } from '../../utils/constants'
import Footer from '../Footer/Footer'
import { CurrentTemperatureUnitContext } from '../../utils/contexts/CurrentTemperatureUnitContext'
import {MyFunctionContext} from '../../utils/contexts/MyFunctionContext'
import AddItemModal from '../AddItemModal/AddItemModal'
import { Route, Routes } from 'react-router-dom'
import Profile from '../Profile/Profile'
import { getItem } from '../../utils/api'

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: {
      F: 999
    },
    city: "",
    isDay: false
  })
  const [activeModal, setActiveModal] = useState("")
  const [selectedCard, setSelectedCard] = useState({})
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F")

  const handleAddClick = () => {
    setActiveModal("add-garment")
  }
  const closeActiveModal = () => {
    setActiveModal("")
  }
  const handleCardClick = (card) => {
    setActiveModal("preview")
    setSelectedCard(card)
  }
  const handleAddItem = (e, data) => {
    e.preventDefault()
    console.log(data)
  }

  useEffect(() => {
    getWeather(coordinates, APIKey).then((data) => {
      const filteredData = filterWeatherData(data)
      setWeatherData(filteredData)
    }).catch(console.error)
  }, [])

  useEffect(()=>{
    getItem().then(data => console.log(data)).catch(console.error)
  }, [])

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C")
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F")
  }

  return (
    <div className='page'>
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange, handleAddClick }}>
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <MyFunctionContext.Provider value={{handleAddClick}}>
            <Routes>
              <Route path='/' element={<Main weatherData={weatherData} handleCardClick={handleCardClick} />} />
              <Route path='/profile' element={<Profile handleCardClick={handleCardClick}/>} />
            </Routes>
          </MyFunctionContext.Provider>
          <Footer />
        </div>
        <AddItemModal closeActiveModal={closeActiveModal} activeModal={activeModal} handleAddItem={handleAddItem} />
        <ItemModal isOpen={activeModal === "preview"} card={selectedCard} handleCloseClick={closeActiveModal} />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
