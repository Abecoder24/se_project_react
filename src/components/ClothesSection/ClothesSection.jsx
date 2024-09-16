import './ClothesSection.css'
import { useContext } from 'react'
import { defaultClothingItems } from "../../utils/constants"
import {MyFunctionContext} from "../contexts/MyFunctionContext"
import ItemCard from "../ItemCard/ItemCard"
const ClothesSection = ({handleCardClick}) => {
    const {handleAddClick} = useContext(MyFunctionContext)
    return <div className="clothes-section">
        <div className="clothes-section__content">
            <p>Your Items</p>
            <button className='clothes-section__addBtn' onClick={handleAddClick}>+ Add Item</button>
        </div>
        <ul className="clothes-section__items">
            {
                defaultClothingItems
                    .map((item) => {
                        return <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
                    })
            }
        </ul>
    </div>
}
export default ClothesSection