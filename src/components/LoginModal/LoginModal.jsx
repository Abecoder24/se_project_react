import ModalWithForm from "../ModalWithForm/ModalWithForm"
import './LoginModal.css'

const LoginModal = ({ isLoading, formErrors, handleAltClick, closeActiveModal, activeModal, submitButtonClass, handleLogin, formGetter, formSetter, handleInputChange, formInputValidaton, formValidation }) => {
    const { loginEmailValidation, loginPasswordValidation } = formInputValidaton
    const inputChange = async (e) => {
        handleInputChange(e, formSetter)
    }

    return (
        <ModalWithForm buttonText={isLoading ? "Logging In..." : "Login"} title={"Login"} isOpen={activeModal === "login"} handleCloseClick={closeActiveModal} handleFormSubmit={handleLogin} formData={formGetter} submitButtonClass={submitButtonClass} altButtonText={'SignUp'} handleAltClick={handleAltClick} formValidation={formValidation}>
            <label htmlFor="email" className={`modal__label ${!loginEmailValidation.isValid && loginEmailValidation.message != "" && 'notValid'}`}>
                <span>
                    Email {!loginEmailValidation.isValid && loginEmailValidation.message != "" && <small>( {loginEmailValidation.message} )</small>}
                </span>
                <input type="text" className="text__input modal__input" id="email" name="email" placeholder="Email" onChange={inputChange} value={formGetter.email} required />
            </label>
            <label htmlFor="password" className={`modal__label ${!loginPasswordValidation.isValid && loginPasswordValidation.message != "" && 'notValid'}`}>
                <span>
                    Password {!loginPasswordValidation.isValid && loginPasswordValidation.message != "" && <small>( {loginPasswordValidation.message} )</small>}

                </span>
                <input type="password" className="text__input input__image" id="password" name="password" placeholder="Password" onChange={inputChange} value={formGetter.password} required />
                {formErrors.loginForm.message != "" && <span className="modal__label-error">{formErrors.loginForm.message}</span>}
            </label>
        </ModalWithForm>
    )
}

export default LoginModal