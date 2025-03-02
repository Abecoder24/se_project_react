import ModalWithForm from "../ModalWithForm/ModalWithForm"

const AddItemModal = ({ isLoading, activeModal, closeActiveModal, handleAddItem, formGetter, formSetter, handleInputChange, formInputValidaton, formValidation, submitButtonClass }) => {

    const { itemNameValidation, itemImageUrlValidation, itemWeatherValidation } = formInputValidaton
    function inputChange(e) {
        handleInputChange(e, formSetter)
    }

    return (
        <ModalWithForm buttonText={isLoading ? "Adding..." : "Add garment"} title={"Add garment"} isOpen={activeModal === "add-garment"} handleCloseClick={closeActiveModal} handleFormSubmit={handleAddItem} formData={formGetter} submitButtonClass={submitButtonClass} formValidation={formValidation}>
            <label htmlFor="name" className={`modal__label ${!itemNameValidation.isValid && itemNameValidation.message != "" ? "notValid" : ""}`}>
                <span>
                    Name {!itemNameValidation.isValid && itemNameValidation.message != "" && <small>( {itemNameValidation.message} )</small>}
                </span>
                <input type="text"
                    className="text__input modal__input"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={inputChange}
                    value={formGetter.name}
                />
            </label>
            <label htmlFor="imageUrl" className={`modal__label ${!itemImageUrlValidation.isValid && itemImageUrlValidation.message != "" ? "notValid" : ""}`}>
                <span>
                    Image
                    {!itemImageUrlValidation.isValid && itemImageUrlValidation.message != "" && <small>( {itemImageUrlValidation.message} )</small>}
                </span>
                <input
                    type="text"
                    className="text__input input__image"
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="Image URL"
                    onChange={inputChange}
                    value={formGetter.imageUrl}
                />
            </label>
            <fieldset className="modal__radio-button" onChange={inputChange} value={formGetter.weather}>
                <legend className={`modal__legend ${!itemWeatherValidation.isValid && itemWeatherValidation.message != "" ? "notValid" : ""}`}>
                    <span>
                        Select the Weather type
                        {!itemWeatherValidation.isValid && itemWeatherValidation.message != "" && <small>( {itemWeatherValidation.message} )</small>}

                    </span>
                </legend>
                <label htmlFor="cold" className="modal__label modal__label_type_radio">
                    <input type="radio" name="weather" value="cold" id="cold" className="modal__radio-input" /> Cold
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