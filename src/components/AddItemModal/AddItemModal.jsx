import { useEffect, useState } from "react"
import ModalWithForm from "../ModalWithForm/ModalWithForm"

const AddItemModal = ({ activeModal, closeActiveModal, handleAddItem, formSetter, formGetter }) => {
    const { setClothName, setClothImageURL, setClothWeatherType } = formSetter
    const { clothName, clothImageURL, clothWeatherType, submitButtonClass } = formGetter
    return (
        <ModalWithForm buttonText={"Add garment"} title={"Add garment"} isOpen={activeModal === "add-garment"} handleCloseClick={closeActiveModal} handleFormSubmit={handleAddItem} formData={{ clothName, clothImageURL, clothWeatherType }} submitButtonClass={submitButtonClass}>
            <label htmlFor="name" className="modal__label">
                Name <input type="text" className="text__input modal__input" id="name" placeholder="Name" onChange={(e) => setClothName(e.target.value)} value={clothName} required />
            </label>
            <label htmlFor="imageUrl" className=" modal__label">
                Image {" "} <input type="text" className="text__input input__image" id="imageUrl" placeholder="Image URL" onChange={(e) => setClothImageURL(e.target.value)} value={clothImageURL} required />
            </label>
            <fieldset className="modal__radio-button" onChange={(e) => setClothWeatherType(e.target.value)} value={clothWeatherType}>
                <legend className="modal__legend">Select the Weather type</legend>
                <label htmlFor="cold" className="modal__label modal__label_type_radio">
                    <input type="radio" name="weather" value="cold" id="cold" className="modal__radio-input" required /> Cold
                </label>
                <label htmlFor="warm" className="modal__label modal__label_type_radio">
                    <input type="radio" name="weather" value="warm" id="warm" className="modal__radio-input" /> Warm
                </label>
                <label htmlFor="hot" className="modal__label modal__label_type_radio">
                    <input type="radio" name="weather" value="hot" id="hot" className="modal__radio-input" /> Hot
                </label>
            </fieldset>
        </ModalWithForm>
    )
}

export default AddItemModal