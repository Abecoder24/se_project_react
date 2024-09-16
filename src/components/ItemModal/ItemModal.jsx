import "./ItemModal.css";
import closeIcon from "../../assets/close-icon.png";
function ItemModal({ isOpen, card, handleCloseClick, showConfirmDeleteModal }) {
    return (
        <div className={`modal ${isOpen && "modal_opened"}`}>
            <div className="modal__content modal__content_type_image">
                <img src={closeIcon} className="modal__close" onClick={handleCloseClick} alt="Close Button" />
                <img src={card.imageUrl} alt={card.name} className="modal__image" />
                <div className="modal__footer">
                    <h2 className="modal__caption">{card.name}</h2>
                    <p className="modal__weather">Weather: {card.weather}</p>
                    <button className="modal__deleteBtn" onClick={showConfirmDeleteModal}>Delete item</button>
                </div>
            </div>
        </div>
    )
}
export default ItemModal