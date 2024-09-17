import "./ItemCard.css"
function ItemCard({ item, onCardClick }) {
    const handleCardClick = () => {
        onCardClick(item)
    }
    return (
        <li className="card" id={item._id}>
            <h2 className="card__name">{item.name}</h2>
            <img className="card__image" src={item.imageUrl} alt={item.name} onClick={handleCardClick} />
        </li>
    );
}
export default ItemCard