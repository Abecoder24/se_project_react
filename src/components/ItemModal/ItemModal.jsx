import "./ItemModal.css";
import closeIcon from "../../assets/close-icon.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";
function ItemModal({ isOpen, card, handleCloseClick, showConfirmDeleteModal }) {
    const currentUser = useContext(CurrentUserContext)
    const isOwner = card.owner == currentUser._id
    return (
        <div className={`modal ${isOpen && "modal_opened"}`}>
            <div className="modal__content modal__content_type_image">
                <img src={closeIcon} className="modal__close" onClick={handleCloseClick} alt="Close Button" />
                <img src={card.imageUrl} alt={card.name} className="modal__image" />
                <div className="modal__footer">
                    <h2 className="modal__caption">{card.name}</h2>
                    <p className="modal__weather">Weather: {card.weather}</p>
                    {isOwner && (<button className="modal__deleteBtn" onClick={showConfirmDeleteModal}>Delete item</button>)}
                </div>
            </div>
        </div>
    )
}
export default ItemModal