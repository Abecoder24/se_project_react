import ModalWithForm from "../ModalWithForm/ModalWithForm"
import './RegisterModal.css'
const RegisterModal = ({ handleAltClick, closeActiveModal, activeModal, formGetter, formSetter, submitButtonClass, handleRegister, formInputValidaton, formValidation, handleInputChange, formErrors }) => {
    const { registerEmailValidation, registerAvatarValidation, registerNameValidation, registerPasswordValidation, registerConfirmPasswordValidation } = formInputValidaton
    function inputChange(e) {
        handleInputChange(e, formSetter)
    }
    return (
        <ModalWithForm buttonText={"SignUp"} title={"Sign Up"} isOpen={activeModal === "register"} handleCloseClick={closeActiveModal} submitButtonClass={submitButtonClass} altButtonText={"Login"} handleAltClick={handleAltClick} handleFormSubmit={handleRegister} formValidation={formValidation} formData={formGetter} formErrors={formErrors}>
            <label htmlFor="email" className={`modal__label ${!registerEmailValidation.isValid && registerEmailValidation.message != "" && 'notValid'} ${formErrors.email.message != "" && 'notValid'}`}>
                <span>
                    Email* {!registerEmailValidation.isValid && registerEmailValidation.message != "" && <small>( {registerEmailValidation.message} )</small>} {formErrors.email.message != "" && <label className="modal__label-error">{formErrors.email.message}</label>}
                </span>
                <input type="text" className="text__input modal__input" id="email" name="email" placeholder="Email" onChange={inputChange} value={formGetter.email} required />
            </label>
            <label htmlFor="password" className={`modal__label ${registerPasswordValidation.message != "" && !registerPasswordValidation.isValid && "notValid"}`}>
                <span>
                    Password* {!registerPasswordValidation.isValid && registerPasswordValidation.message != "" && <small>( {registerPasswordValidation.message} )</small>}
                </span>
                <input type="password" className="text__input input__image" id="password" name="password" placeholder="Password" onChange={inputChange} value={formGetter.password} required />
            </label>
            <label htmlFor="confirmpassword" className={`modal__label ${registerConfirmPasswordValidation.message != "" && !registerConfirmPasswordValidation.isValid && "notValid"}`}>
                <span>
                    Confirm Password* {!registerConfirmPasswordValidation.isValid && registerConfirmPasswordValidation.message != "" && <small>( {registerConfirmPasswordValidation.message} )</small>}
                </span>
                <input type="password" className="text__input input__image" id="confirmpassword" name="confirmPassword" placeholder="Confirm Password" onChange={inputChange} value={formGetter.confirmPassword} required />
            </label>
            <label htmlFor="name" className={`modal__label ${registerNameValidation.message != "" && !registerNameValidation.isValid && 'notValid'}`}>
                <span>
                    Name* {!registerNameValidation.isValid && registerNameValidation.message != "" && <small>( {registerNameValidation.message} )</small>}
                </span>
                <input type="text" className="text__input modal__input" id="name" name="name" placeholder="Name" onChange={inputChange} value={formGetter.name} required />
            </label>
            <label htmlFor="avatar" className={`modal__label ${!registerAvatarValidation.isValid && registerAvatarValidation.message != "" && 'notValid'}`}>
                <span>
                    Avatar URL* {!registerAvatarValidation.isValid && registerAvatarValidation.message != "" && <small>( {registerAvatarValidation.message} )</small>}
                </span>
                <input type="text" className="text__input input__image" id="avatar" name="avatar" placeholder="Avatar URL" onChange={inputChange} value={formGetter.avatar} required />
            </label>
            {formErrors.registerForm.message != "" && <span className="modal__label-error">{formErrors.registerForm.message}</span>}


        </ModalWithForm>
    )
}

export default RegisterModal