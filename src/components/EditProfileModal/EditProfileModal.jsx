import { useContext, useEffect } from "react"
import ModalWithForm from "../ModalWithForm/ModalWithForm"
import './EditProfileModal.css'
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext"

const EditProfileModal = ({ isLoading, activeModal, closeActiveModal, handleEditProfile, formGetter, formSetter, submitButtonClass, formValidation, formInputValidation, handleInputChange }) => {
    const currentUser = useContext(CurrentUserContext)
    const { profileAvatarValidation, profileNameValidation } = formInputValidation
    const inputChange = (e) => {
        handleInputChange(e, formSetter)
    }

    useEffect(() => {
        if(currentUser.name && currentUser.avatar){
            formSetter({
                name: currentUser?.name,
                avatar: currentUser?.avatar
            })
        }
    }, [currentUser])

    return (
        <ModalWithForm buttonText={isLoading ? "Saving Changes..." : "Save Changes"} title={"Change Profile Data"} isOpen={activeModal === "editProfile"} handleCloseClick={closeActiveModal} handleFormSubmit={handleEditProfile} formData={formGetter} submitButtonClass={submitButtonClass} formValidation={formValidation}>
            <label htmlFor="currentUserName" className={`modal__label ${profileNameValidation.message != "" && !profileNameValidation.isValid && 'notValid'}`}>
                <span>
                    Name* {!profileNameValidation.isValid && profileNameValidation.message != "" && <small>( {profileNameValidation.message} )</small>}
                </span>
                <input type="text" className="text__input modal__input" id="currentUserName" name="name" placeholder="Name" value={formGetter.name} onChange={inputChange} required />
            </label>
            <label htmlFor="avatar" className={`modal__label ${!profileAvatarValidation.isValid && profileAvatarValidation.message != "" && 'notValid'}`}>
                <span>
                    Avatar URL* {!profileAvatarValidation.isValid && profileAvatarValidation.message != "" && <small>( {profileAvatarValidation.message} )</small>}
                </span>
                <input type="text" className="text__input input__image" id="avatar" name="avatar" placeholder="Avatar URL" value={formGetter.avatar} onChange={inputChange} required />
            </label>
        </ModalWithForm>
    )
}

export default EditProfileModal