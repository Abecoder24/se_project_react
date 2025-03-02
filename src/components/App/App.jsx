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
import { useNavigate, Route, Routes } from 'react-router-dom'
import Profile from '../Profile/Profile'
import * as api from '../../utils/api'
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'
import LoginModal from '../LoginModal/LoginModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import { CurrentUserContext } from '../../utils/contexts/CurrentUserContext'
import EditProfileModal from '../EditProfileModal/EditProfileModal'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function App() {
  //Navigate
  const navigate = useNavigate()

  // -------------- HOOKS ------------
  // -- weather realated Hooks --
  //Weather Data
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: {
      F: 999
    },
    city: "",
    isDay: false
  })

  //Temprature
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F")


  // -- LoggedIn User Related Hooks --
  //Login Token
  const [loginToken, setLoginToken] = useState("")
  //Login Status
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  //Current LoggedIn user
  const [currentUser, setCurrentUser] = useState({})


  // -- Cards and Modals related Hooks -- 
  //Active Modal
  const [activeModal, setActiveModal] = useState("")


  //  -- Clothing Items Related Hooks --
  //Selected Item Card
  const [selectedCard, setSelectedCard] = useState({})
  //Cothing Items
  const [clothingItems, setClothingItems] = useState([])



  // -- Form Related Hooks --
  const [isLoading, setIsLoading] = useState(false);
  //Form Submit Button Class
  const [submitButtonClass, setSubmitButtonClass] = useState('notFullyVisible')
  //Form Success
  const [formSuccess, setFormSuccess] = useState({
    registerForm: {
      message: ""
    }
  })
  //Form Errors
  const [formErrors, setFormErrors] = useState({
    email: {
      message: ""
    },
    registerForm: {
      message: ""
    },
    loginForm: {
      message: ""
    }
  })
  //Login form
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  })
  //Register a User Form
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    avatar: ""
  })
  //Add New Item Form
  const [itemForm, setItemForm] = useState({
    name: "",
    imageUrl: "",
    weather: ""
  })
  //Edit Profile Input Form
  const [profileFormData, setProfileFormData] = useState({
    name: "",
    avatar: ""
  })




  // -- Validation Related Hooks --
  //Login Form Validation
  const [loginFormValidation, setLoginFormValidation] = useState(false)
  //Login form Input Validation
  const [loginEmailValidation, setLoginEmailValidation] = useState({
    isValid: false,
    message: ""
  })
  const [loginPasswordValidation, setLoginPasswordValidation] = useState({
    isValid: false,
    message: ""
  })


  //Register User Form Validation
  const [registerFormValidation, setRegisterFormValidation] = useState(false)
  //Register User Input Validation
  const [registerEmailValidation, setRegisterEmailValidation] = useState({
    isValid: false,
    message: ""
  })
  const [registerAvatarValidation, setRegisterAvatarValidation] = useState({
    isValid: false,
    message: ""
  })
  const [registerNameValidation, setRegisterNameValidation] = useState({
    isValid: false,
    message: ""
  })
  const [registerPasswordValidation, setRegisterPasswordValidation] = useState({
    isValid: false,
    message: ""
  })
  const [registerConfirmPasswordValidation, setRegisterConfirmPasswordValidation] = useState({
    isValid: false,
    message: ""
  })


  //Add Item Form Validation
  const [addItemFormValidation, setAddItemFormValidation] = useState(false)
  //Item Name Validation
  const [itemNameValidation, setItemNameValidation] = useState({
    isValid: false,
    message: ""
  })
  //Item Image URL Validation
  const [itemImageUrlValidation, setItemImageUrlValidaton] = useState({
    isValid: false,
    message: ""
  })
  //Item Weather Type Validation
  const [itemWeatherValidation, setItemWeatherValidation] = useState({
    isValid: false,
    message: ""
  })


  //Edit Profile Form Validation
  const [profileFormValidation, setProfileFormValidation] = useState(false)
  //Edit Profile Input validation
  const [profileAvatarValidation, setProfileAvatarValidation] = useState({
    isValid: false,
    message: ""
  })
  const [profileNameValidation, setProfileNameValidation] = useState({
    isValid: false,
    message: ""
  })



  // ------------ Validating Form Inputs -------------


  //Validating the Login form Inputs
  useEffect(() => {
    // validating Email Addresses
    if (loginFormData.email.length > 0) {
      if (loginFormData.email.includes('@') && loginFormData.email.includes('.')) {
        handleValidationChange(setLoginEmailValidation, true, 'all good')
      } else {
        handleValidationChange(setLoginEmailValidation, false, 'not an valid Email')
      }
    } else {
      handleValidationChange(setLoginEmailValidation, false, '')
    }
    //validating Password
    if (loginFormData.password.length > 0) {
      handleValidationChange(setLoginPasswordValidation, true, "all good")
    } else {
      handleValidationChange(setLoginPasswordValidation, false, "")
    }
  }, [loginFormData])
  //validating the Login Form
  useEffect(() => {
    if (loginEmailValidation.isValid && loginPasswordValidation.isValid && formErrors.loginForm.message == "") {
      setLoginFormValidation(true)
      setSubmitButtonClass('fullyVisible')
    } else {
      setLoginFormValidation(false)
      setSubmitButtonClass('notFullyVisible')
    }
  }, [loginEmailValidation, loginPasswordValidation, formErrors])
  // Validating Register Form
  useEffect(() => {
    // validating Email Addresses
    if (registerFormData.email.length > 0) {
      if (registerFormData.email.includes('@') && registerFormData.email.includes('.')) {
        handleValidationChange(setRegisterEmailValidation, true, 'all good')
      } else {
        handleValidationChange(setRegisterEmailValidation, false, 'not an valid Email')
      }
    } else {
      handleValidationChange(setRegisterEmailValidation, false, '')
    }
    //validating Name
    if (registerFormData.name.length > 0) {
      if (registerFormData.name.length < 3) {
        handleValidationChange(setRegisterNameValidation, false, "Too short")
      } else if (registerFormData.name.length > 3 && registerFormData.name.length > 20) {
        handleValidationChange(setRegisterNameValidation, false, "Too long")
      } else {
        handleValidationChange(setRegisterNameValidation, true, "all good")
      }
    } else {
      handleValidationChange(setRegisterNameValidation, false, "")
    }
    //validating Password
    if (registerFormData.password.length > 0) {
      if (registerFormData.password.length < 8) {
        handleValidationChange(setRegisterPasswordValidation, false, "too Short")
      } else {
        handleValidationChange(setRegisterPasswordValidation, true, "all good")
      }
    } else {
      handleValidationChange(setRegisterPasswordValidation, false, "")
    }
    //validating Confirm Password
    if (registerFormData.confirmPassword.length > 0) {
      if (registerFormData.confirmPassword.length < 8) {
        handleValidationChange(setRegisterConfirmPasswordValidation, false, "too Short")
      } else if (registerFormData.confirmPassword != registerFormData.password) {
        handleValidationChange(setRegisterConfirmPasswordValidation, false, "Does not Match")
      } else {
        handleValidationChange(setRegisterConfirmPasswordValidation, true, "all good")
      }
    } else {
      handleValidationChange(setRegisterConfirmPasswordValidation, false, "")
    }
    // validating Image URL
    if (registerFormData.avatar.length > 0) {
      if (registerFormData.avatar.includes('http') && registerFormData.avatar.includes('.') && registerFormData.avatar.includes('/')) {
        handleValidationChange(setRegisterAvatarValidation, true, "all good")
      } else {
        handleValidationChange(setRegisterAvatarValidation, false, "not a valid Image URL")
      }
    } else {
      handleValidationChange(setRegisterAvatarValidation, false, "")
    }
  }, [registerFormData])
  //Validating Registration Form
  useEffect(() => {
    //FormValidator
    if (registerEmailValidation.isValid && registerPasswordValidation.isValid && registerConfirmPasswordValidation.isValid && registerNameValidation.isValid && registerAvatarValidation.isValid && formErrors.registerForm.message == "" && formErrors.email.message == "") {
      setRegisterFormValidation(true)
      setSubmitButtonClass("fullyVisible")
    } else {
      setRegisterFormValidation(false)
      setSubmitButtonClass("notFullyVisible")
    }
  }, [registerEmailValidation, registerPasswordValidation, registerConfirmPasswordValidation, registerNameValidation, registerAvatarValidation, formErrors])


  //validating Add Item Form's Inputs
  useEffect(() => {
    //name validation
    if (itemForm.name.length > 0) {
      if (itemForm.name.length > 3) {
        handleValidationChange(setItemNameValidation, true, "all good")
      } else {
        handleValidationChange(setItemNameValidation, false, "Too short")
      }
    } else {
      handleValidationChange(setItemNameValidation, false, "")
    }
    //imageUrl Validation
    if (itemForm.imageUrl.length > 0) {
      if (itemForm.imageUrl.startsWith("http") && itemForm.imageUrl.includes(".")) {
        handleValidationChange(setItemImageUrlValidaton, true, "all good")
      } else {
        handleValidationChange(setItemImageUrlValidaton, false, "not a Valid Image URL")
      }
    } else {
      handleValidationChange(setItemImageUrlValidaton, false, "")
    }
    //weather Validation
    if (itemForm.weather != "") {
      handleValidationChange(setItemWeatherValidation, true, "all good")
    } else {
      handleValidationChange(setItemWeatherValidation, false, "")
    }
  }, [itemForm])
  //Validating Add Item Form
  useEffect(() => {
    if (itemNameValidation.isValid && itemImageUrlValidation.isValid && itemWeatherValidation.isValid) {
      setSubmitButtonClass('fullyVisible')
      setAddItemFormValidation(true)
    } else {
      setSubmitButtonClass('notFullyVisible')
      setAddItemFormValidation(false)
    }
  }, [itemNameValidation, itemImageUrlValidation, itemWeatherValidation])


  //validating Edit Profile Form's Inputs
  useEffect(() => {
    //validating Name
    if (profileFormData?.name?.length > 0) {
      if (profileFormData.name.length < 3) {
        handleValidationChange(setProfileNameValidation, false, "Too short")
      } else if (profileFormData.name.length > 3 && profileFormData.name.length > 20) {
        handleValidationChange(setProfileNameValidation, false, "Too long")
      } else {
        handleValidationChange(setProfileNameValidation, true, "all good")
      }
    } else {
      handleValidationChange(setProfileNameValidation, false, "")
    }
    // validating Image URL
    if (profileFormData?.avatar?.length > 0) {
      if (profileFormData.avatar.includes('http') && profileFormData.avatar.includes('.') && profileFormData.avatar.includes('/')) {
        handleValidationChange(setProfileAvatarValidation, true, "all good")
      } else {
        handleValidationChange(setProfileAvatarValidation, false, "not a valid Image URL")
      }
    } else {
      handleValidationChange(setProfileAvatarValidation, false, "")
    }
  }, [profileFormData])
  //Validating Edit Profile Form
  useEffect(() => {
    //FormValidator
    if (profileAvatarValidation.isValid && profileNameValidation.isValid) {
      //make sure that atleast one data is different then the OLD data
      if (profileFormData.avatar != currentUser.avatar || profileFormData.name != currentUser.name) {
        setProfileFormValidation(true)
        setSubmitButtonClass("fullyVisible")
      } else {
        setProfileFormValidation(false)
        setSubmitButtonClass("notFullyVisible")
      }
    } else {
      setProfileFormValidation(false)
      setSubmitButtonClass("notFullyVisible")
    }
  }, [profileAvatarValidation, profileNameValidation])



  // ------------------ Function --------------------------------
  // -- Weather Related Functions --
  //toggle F and C
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C")
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F")
  }



  // -- PopUp Modal related Functions -- 
  const handleAddClick = () => {
    setActiveModal("add-garment")
  }
  const handleLoginClick = () => {
    setActiveModal("login")
  }
  const handleRegisterClick = () => {
    setActiveModal("register")
  }
  const closeActiveModal = () => {
    setActiveModal("")
    clearAllFormInputs()
  }
  const handleCardClick = (card) => {
    setActiveModal("preview")
    setSelectedCard(card)
  }
  const showConfirmDeleteModal = () => {
    setActiveModal("confirm")
  }
  const handleEditProfileClick = () => {
    setActiveModal("editProfile")
  }
  // Toggle BetWeen Login and Register Modal
  const loginRegisterToggle = () => {
    if (activeModal == "login") {
      setActiveModal("register")
    } else {
      setActiveModal('login')
    }
  }



  // -- Form Related Function --
  //form input change
  const handleInputChange = (e, setter) => {
    const { name, value } = e.target
    setter(oldData => ({
      ...oldData,
      [name]: value
    }))
    handleFormErrors(name, "")
    clearFormErrors()
  }
  //Handle Form Submit
  function handleSubmit(request) {
    // start loading
    setIsLoading(true);
    request()
      // we need to close only in `then`
      .then(res => {
        if(res != "showSuccess"){
          closeActiveModal()
        }
      }) 
      // we need to catch possible errors
      // console.error is used to handle errors if you don’t have any other ways for that
      .catch(err => {
        if (err.includes('401')) {
          handleFormErrors("loginForm", "Email or Password is incorrect")
        }else if (err.includes('409')) {
          console.log('Email already Exist')
          handleFormErrors("email", "Email already Exist")
        } else {
          handleFormErrors("loginForm", "Sorry, Something went wrong")
        }
      })
      // and in finally we need to stop loading
      .finally(() => setIsLoading(false));
  }
  //Hangle User Login
  const handleLogin = (data) => {
    function makeRequest(){
      return api.loginUser(data)
      .then(resData => {
        if (resData.token) {
          localStorage.setItem('jwt', resData.token)
          setIsLoggedIn(true)
        } else {
          return Promise.reject('Token Not Found')
        }
      })
    }
    handleSubmit(makeRequest)
  }

  //Handle user Registration
  const handleRegister = (data) => {
    function makeRequest(){
      return api.registerUser(data)
      .then(resData => {
        setIsLoading(false)
        if (resData != undefined) {
          handleFormSuccess("registerForm", "Account created successfully, Please login now")
          return "showSuccess"
        } else {
          return Promise.reject('Something Went Wrong')
        }
      })
    }
    handleSubmit(makeRequest)
  }
  //Handle add Item
  const handleAddItem = (data) => {    
    function makeRequest(){
      return api.addItem(data, loginToken).then(resData => {
        setIsLoading(false)
        if (resData != undefined) {
          setClothingItems([resData?.data, ...clothingItems])
          closeActiveModal()
          clearAddItemForm()
        }
      })
    }
    handleSubmit(makeRequest)
  }
  //Handle Item Delete
  const handleDeleteCard = () => {
    function makeRequest(){
      return api.deleteItem(selectedCard._id, loginToken).then(() => {
        setIsLoading(false)
        const updatedClotingItem = clothingItems.filter(item => {
          return item._id != selectedCard._id
        })
        setClothingItems(updatedClotingItem)
        closeActiveModal()
      })
    }
    handleSubmit(makeRequest)
  }
  //Handle Edit Profile Data
  const handleEditProfile = (data) => {
    function makeRequest(){
      return api.updateUserData(data, loginToken).then(res => {
        setIsLoading(false)
        if (res) {
          closeActiveModal()
          setCurrentUser((oldData) => (
            {
              ...oldData,
              name: res.name,
              avatar: res.avatar
            }
          )
          )
        }
      })
    }
    handleSubmit(makeRequest)
  }
  
  //Handle Item Like
  const handleCardLike = (id, isLiked) => {
    !isLiked
      ?
      api
        // the first argument is the card's id
        .addCardLike(id, loginToken)
        .then((updatedCard) => {
          console.log(updatedCard)
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard.data : item))
          );
        })
        .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
      api
        // the first argument is the card's id
        .removeCardLike(id, token)
        .then((updatedCard) => {
          console.log(updatedCard)
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard.data : item))
          );
        })
        .catch((err) => console.log(err));
  }
  //Handle Signout
  const handleSignOut = () => {
    localStorage.removeItem('jwt')
    setIsLoggedIn(false)
    setCurrentUser({})
    navigate("/")
  }



  // -- Form Validation Related Function --
  function handleValidationChange(setter, validationState, msg) {
    setter({
      isValid: validationState,
      message: msg
    })
  }



  // -- Form Success Related Functions --
  function handleFormSuccess(key, msg) {
    setFormSuccess(oldData => ({
      ...oldData,
      [key]: {
        message: msg
      }
    }))
  }

  // -- Form Errors Related Functions --
  function handleFormErrors(key, msg) {
    setFormErrors(oldData => ({
      ...oldData,
      [key]: {
        message: msg
      }
    }))
  }



  // -- Load Content Once on Page Load or When the Hook Changes --
  //reset Submit Button Class on Active Model change
  useEffect(() => {
    setSubmitButtonClass("notFullyVisible")
  }, [activeModal])
  //Check the Token and Remember Logged In user
  useEffect(() => {
    const jwtTokken = localStorage.getItem('jwt')
    if (jwtTokken) {
      api.checkToken(jwtTokken).then(resData => {
        if (resData != undefined) {
          setLoginToken(jwtTokken)
          setIsLoggedIn(true)
          setCurrentUser(resData)
        }
      }).catch(err => {
        console.log(err)
        setIsLoggedIn(false)
        setCurrentUser({})
      })
    }
  }, [isLoggedIn])
  //Get Weather Data
  useEffect(() => {
    getWeather(coordinates, APIKey).then((data) => {
      const filteredData = filterWeatherData(data)
      setWeatherData(filteredData)
    }).catch(console.error)
  }, [])
  //Get Clothing Items
  useEffect(() => {
    api.getItem().then(data => {
      setClothingItems(data)
    }).catch(console.error)
  }, [])
  //Adding KeyDown Event Listener to Active Modal
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



  // -- Clearing and Default Values Related Function --
  //clear Add Item Form
  function clearAddItemForm() {
    setItemForm({
      name: "",
      imageUrl: "",
      weather: ""
    })
    setSubmitButtonClass("notFullyVisible")
  }
  //clear Signin and SignUp formError
  const clearFormErrors = () => {
    handleFormErrors("registerForm", "")
    handleFormErrors("loginForm", "")
  }
  //clear all form Inputs
  const clearAllFormInputs = () => {
    setFormErrors({
      email: {
        message: ""
      },
      registerForm: {
        message: ""
      },
      loginForm: {
        message: ""
      }
    })
    setItemForm({
      name: "",
      imageUrl: "",
      weather: ""
    })
    setRegisterFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      avatar: ""
    })
    setLoginFormData({
      email: "",
      password: ""
    })
    setProfileFormData({
      name: currentUser?.name,
      avatar: currentUser?.avatar
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange, handleAddClick }}>
          <div className="page__content">
            <Header handleButtonsClick={{ handleAddClick, handleLoginClick, handleRegisterClick }} weatherData={weatherData} isLoggedIn={isLoggedIn} />
            <MyFunctionContext.Provider value={{ handleAddClick, handleEditProfileClick, handleCardLike, handleSignOut }}>
              <Routes>
                <Route path='/' element={<Main weatherData={weatherData} handleCardClick={handleCardClick} clothingItems={clothingItems} />} />
                <Route path='/profile' element={<ProtectedRoute isLoggedIn={isLoggedIn} setActiveModal={setActiveModal}>
                  <Profile handleCardClick={handleCardClick} clothingItems={clothingItems} showLoginModal={handleLoginClick} />
                </ProtectedRoute>} />
              </Routes>
            </MyFunctionContext.Provider>
            <Footer />
          </div>
          <LoginModal isLoading={isLoading} formErrors={formErrors} handleAltClick={loginRegisterToggle} closeActiveModal={closeActiveModal} activeModal={activeModal} submitButtonClass={submitButtonClass} handleLogin={handleLogin} formGetter={loginFormData} formSetter={setLoginFormData} handleInputChange={handleInputChange} handleValidationChange={handleValidationChange} formInputValidaton={{ loginEmailValidation, loginPasswordValidation }} formValidation={loginFormValidation} />
          <RegisterModal isLoading={isLoading} handleAltClick={loginRegisterToggle} closeActiveModal={closeActiveModal} activeModal={activeModal} formGetter={registerFormData} formSetter={setRegisterFormData} submitButtonClass={submitButtonClass} handleRegister={handleRegister} formInputValidaton={{ registerEmailValidation, registerAvatarValidation, registerNameValidation, registerPasswordValidation, registerConfirmPasswordValidation }} formValidation={registerFormValidation} handleInputChange={handleInputChange} formErrors={formErrors} formSuccess={formSuccess} />
          <AddItemModal isLoading={isLoading} closeActiveModal={closeActiveModal} activeModal={activeModal} handleAddItem={handleAddItem} formGetter={itemForm} formSetter={setItemForm} handleInputChange={handleInputChange} handleValidationChange={handleValidationChange} formInputValidaton={{ itemNameValidation, itemImageUrlValidation, itemWeatherValidation }} submitButtonClass={submitButtonClass} formValidation={addItemFormValidation} />
          <EditProfileModal isLoading={isLoading} activeModal={activeModal} closeActiveModal={closeActiveModal} handleEditProfile={handleEditProfile} formGetter={profileFormData} formSetter={setProfileFormData} formValidation={profileFormValidation} submitButtonClass={submitButtonClass} formInputValidation={{ profileAvatarValidation, profileNameValidation }} handleInputChange={handleInputChange} />
          <ConfirmDeleteModal isLoading={isLoading} isOpen={activeModal === "confirm"} handleCloseClick={closeActiveModal} handleDeleteCard={handleDeleteCard} />
          <ItemModal isOpen={activeModal === "preview"} card={selectedCard} handleCloseClick={closeActiveModal} showConfirmDeleteModal={showConfirmDeleteModal} />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
