import './ClothesSection.css'
import { useContext } from 'react'
import {MyFunctionContext} from "../../utils/contexts/MyFunctionContext"
import ItemCard from "../ItemCard/ItemCard"
const ClothesSection = ({handleCardClick, clothingItems}) => {
    const {handleAddClick} = useContext(MyFunctionContext)
    return <div className="clothes-section">
        <div className="clothes-section__content">
            <p>Your Items</p>
            <button className='clothes-section__addBtn' onClick={handleAddClick}>+ Add Item</button>
        </div>
        <ul className="clothes-section__items">
            {
                clothingItems
                    .map((item) => {
                        return <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
                    })
            }
        </ul>
    </div>
}
export default ClothesSection