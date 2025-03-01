import './ClothesSection.css'
import { useContext } from 'react'
import { MyFunctionContext } from "../../utils/contexts/MyFunctionContext"
import { CurrentUserContext } from '../../utils/contexts/CurrentUserContext'
import ItemCard from "../ItemCard/ItemCard"
const ClothesSection = ({ handleCardClick, clothingItems }) => {
    const { handleAddClick } = useContext(MyFunctionContext)
    const currentUser = useContext(CurrentUserContext)
    return (
        <div className="clothes-section">
            <div className="clothes-section__content">
                <p>Your Items</p>
                <button className='clothes-section__addBtn' onClick={handleAddClick}>+ Add Item</button>
            </div>
            <ul className="clothes-section__items">
                {
                    clothingItems
                        .map((item) => {
                            const isOwned = currentUser._id === item.owner
                            if (isOwned && currentUser._id != undefined && item.owner != undefined) {
                                return <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
                            }
                        })
                }
            </ul>
        </div>
    )
}
export default ClothesSection