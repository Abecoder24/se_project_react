import "./ModalWithAlert.css"
import closeIcon from "../../assets/close-icon.png";
function ModalWithAlert({ title, isOpen, handleCloseClick, handleFormSubmit, buttonText}) {
    return <div className={`modalalert ${ isOpen && "modalalert_opened"}`}>
        <div className="modalalert__content">
            <h2 className="modalalert__title">{title}</h2>
            <h3 className="modalalert__title-2">This action is irreversible.</h3>
            <img src={closeIcon} className="modalalert__close" onClick={handleCloseClick} alt="Close Button" />
            <form action="" className="modalalert__form" onSubmit={handleFormSubmit}>
                <button type="submit" className={`modalalert__submit modalalert__buttons`}>{buttonText}</button>                
            </form>
            <button type="submit" className={`modalalert__cancel modalalert__buttons`} onClick={handleCloseClick}>Cancel</button>
        </div>
    </div>
}
export default ModalWithAlert