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
import { baseUrl } from '../../utils/api'
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'

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
  const [clothingItems, setClothingItems] = useState([])
  const [checkForRefresh, setCheckForRefresh] = useState(false)
  console.log(activeModal)
  console.log(activeModal === "confirm")
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
  const showConfirmDeleteModal = () => {
    setActiveModal("confirm")
  }
  const handleAddItem = (e, data) => {
    e.preventDefault()
    fetch(baseUrl+"/items/", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.clothName,
        weather: data.clothWeatherType,
        imageUrl: data.clothImageURL
      })
    }).then(res => {
        if(res.ok){
          setActiveModal("") //hide the active model
          setCheckForRefresh(!checkForRefresh)//reload the cards
          console.log('Item Added')
        }else{
          console.log('unable to Add the Item')
        }
      });
  }
  const handleDeleteCard = () => {
    fetch(baseUrl+"/items/"+selectedCard._id, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      }}).then(res => {
        if(res.ok){
          setActiveModal("") //hide the active model
          setCheckForRefresh(!checkForRefresh)//reload the cards
          console.log('Item got deleted')
        }else{
          console.log('unable to delete the Item')
        }
      });
  }

  useEffect(() => {
    getWeather(coordinates, APIKey).then((data) => {
      const filteredData = filterWeatherData(data)
      setWeatherData(filteredData)
    }).catch(console.error)
  }, [])

  useEffect(()=>{
    getItem().then(data => {
      setClothingItems(data)
      console.log(data)
    }).catch(console.error)
  }, [checkForRefresh])

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
              <Route path='/' element={<Main weatherData={weatherData} handleCardClick={handleCardClick} clothingItems={clothingItems}  />} />
              <Route path='/profile' element={<Profile handleCardClick={handleCardClick} clothingItems={clothingItems} />} />
            </Routes>
          </MyFunctionContext.Provider>
          <Footer />
        </div>
        <AddItemModal closeActiveModal={closeActiveModal} activeModal={activeModal} handleAddItem={handleAddItem} />
        <ItemModal isOpen={activeModal === "preview"} card={selectedCard} handleCloseClick={closeActiveModal} showConfirmDeleteModal={showConfirmDeleteModal}/>
        <ConfirmDeleteModal isOpen={activeModal === "confirm"} handleCloseClick={closeActiveModal} handleDeleteCard={handleDeleteCard}/>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
