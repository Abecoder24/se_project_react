import { useContext, useEffect } from "react"
import ModalWithForm from "../ModalWithForm/ModalWithForm"
import './EditProfileModal.css'
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext"

const EditProfileModal = ({ activeModal, closeActiveModal, handleEditProfile, formGetter, formSetter, submitButtonClass, formValidation, formInputValidation, handleInputChange }) => {
    const currentUser = useContext(CurrentUserContext)
    const { profileAvatarValidation, profileNameValidation } = formInputValidation
    const inputChange = (e) => {
        handleInputChange(e, formSetter)
    }

    useEffect(() => {
        formSetter({
            name: currentUser.name,
            avatar: currentUser.avatar
        })
    }, [currentUser])

    return (
        <ModalWithForm buttonText={"Save Changes"} title={"Change Profile Data"} isOpen={activeModal === "editProfile"} handleCloseClick={closeActiveModal} handleFormSubmit={handleEditProfile} formData={formGetter} submitButtonClass={submitButtonClass} formValidation={formValidation}>
            <label htmlFor="name" className={`modal__label ${profileNameValidation.message != "" && !profileNameValidation.isValid && 'notValid'}`}>
                <span>
                    Name* {!profileNameValidation.isValid && profileNameValidation.message != "" && <small>( {profileNameValidation.message} )</small>}
                </span>
                <input type="text" className="text__input modal__input" id="name" name="name" placeholder="Name" onChange={inputChange} value={formGetter.name} required />
            </label>
            <label htmlFor="avatar" className={`modal__label ${!profileAvatarValidation.isValid && profileAvatarValidation.message != "" && 'notValid'}`}>
                <span>
                    Avatar URL* {!profileAvatarValidation.isValid && profileAvatarValidation.message != "" && <small>( {profileAvatarValidation.message} )</small>}
                </span>
                <input type="text" className="text__input input__image" id="avatar" name="avatar" placeholder="Avatar URL" onChange={inputChange} value={formGetter.avatar} required />
            </label>
        </ModalWithForm>
    )
}

export default EditProfileModal