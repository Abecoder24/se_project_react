import { useEffect, useState } from 'react'
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ItemModal from '../ItemModal/ItemModal'
import { getWeather, filterWeatherData } from '../../utils/weatherApi'
import { coordinates, APIKey } from '../../utils/constants'
import Footer from '../Footer/Footer'
import { CurrentTemperatureUnitContext } from '../../utils/contexts/CurrentTemperatureUnitContext'
import { MyFunctionContext } from '../../utils/contexts/MyFunctionContext'
import AddItemModal from '../AddItemModal/AddItemModal'
import { Route, Routes } from 'react-router-dom'
import Profile from '../Profile/Profile'
import { getItem, addItem, deleteItem } from '../../utils/api'
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
    console.log(data)
    addItem(data).then(resData => {
      setClothingItems([resData, ...clothingItems])
      closeActiveModal()
    }).catch(console.error)

  }
  const handleDeleteCard = (e) => {
    e.preventDefault()
    deleteItem(selectedCard._id).then(() => {
      const updatedClotingItem = clothingItems.filter(item => {
        return item._id != selectedCard._id
      })
      setClothingItems(updatedClotingItem)
      closeActiveModal()
    }).catch(console.error)
  }

  useEffect(() => {
    getWeather(coordinates, APIKey).then((data) => {
      const filteredData = filterWeatherData(data)
      setWeatherData(filteredData)
    }).catch(console.error)
  }, [])

  useEffect(() => {
    getItem().then(data => {
      setClothingItems(data)
      console.log(data)
    }).catch(console.error)
  }, [])

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C")
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F")
  }

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);
  return (
    <div className='page'>
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange, handleAddClick }}>
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <MyFunctionContext.Provider value={{ handleAddClick }}>
            <Routes>
              <Route path='/' element={<Main weatherData={weatherData} handleCardClick={handleCardClick} clothingItems={clothingItems} />} />
              <Route path='/profile' element={<Profile handleCardClick={handleCardClick} clothingItems={clothingItems} />} />
            </Routes>
          </MyFunctionContext.Provider>
          <Footer />
        </div>
        <AddItemModal closeActiveModal={closeActiveModal} activeModal={activeModal} handleAddItem={handleAddItem} />
        <ItemModal isOpen={activeModal === "preview"} card={selectedCard} handleCloseClick={closeActiveModal} showConfirmDeleteModal={showConfirmDeleteModal} />
        <ConfirmDeleteModal isOpen={activeModal === "confirm"} handleCloseClick={closeActiveModal} handleDeleteCard={handleDeleteCard} />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
