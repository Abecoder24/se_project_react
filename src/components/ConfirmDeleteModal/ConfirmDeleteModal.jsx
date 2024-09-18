import { useState } from "react"
import ModalWithAlert from "../ModalWithAlert/ModalWithAlert"


const ConfirmDeleteModal = ({ handleCloseClick, handleDeleteCard, isOpen }) => {
    return (
        <ModalWithAlert isOpen={isOpen} buttonText={"Yes, delete item"} title={"Are you sure you want to delete this item?"} handleCloseClick={handleCloseClick} handleFormSubmit={handleDeleteCard} >
            <label htmlFor="name" className="modal__label">
                Are you sure?
            </label>
        </ModalWithAlert>
    )
}

export default ConfirmDeleteModal