import "./ModalWithForm.css"
import closeIcon from "../../assets/close-icon.png";
function ModalWithForm({ children, buttonText, title, isOpen, handleCloseClick, handleFormSubmit, formData, submitButtonClass, altButtonText, handleAltClick, formValidation }) {

    return (
        <div className={`modal ${isOpen && "modal_opened"}`}>
            <div className="modal__content">
                <h2 className="modal__title">{title}</h2>
                <img src={closeIcon} className="modal__close" onClick={handleCloseClick} alt="Close Button" />
                <form action="" className="modal__form" onSubmit={(e) => {
                    e.preventDefault()
                    if (formValidation) {
                        handleFormSubmit(formData)
                    }
                }}>
                    {children}
                    <div className="modal__buttons">
                        <button type="submit" className={`modal__submit ${submitButtonClass}`}>{buttonText}</button>
                        {altButtonText != undefined && <button type="button" className={`modal__submit-span`} onClick={handleAltClick}>{altButtonText}</button>}
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ModalWithForm