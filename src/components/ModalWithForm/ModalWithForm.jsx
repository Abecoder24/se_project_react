import "./ModalWithForm.css"
import closeIcon from "../../assets/close-icon.png";
function ModalWithForm({ children, buttonText, title, isOpen, handleCloseClick, handleFormSubmit, formData}) {
    return <div className={`modal ${ isOpen && "modal_opened"}`}>
        <div className="modal__content">
            <h2 className="modal__title">{title}</h2>
            <img src={closeIcon} className="modal__close" onClick={handleCloseClick} alt="Close Button" />
            <form action="" className="modal__form" onSubmit={(e)=> {
                handleFormSubmit(e, formData)
            }}>
                {children}
                <button type="submit" className="modal__submit">{buttonText}</button>
            </form>
        </div>
    </div>
}
export default ModalWithForm