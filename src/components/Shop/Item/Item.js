import './Item.css'

const ShopItem = ({item}) => {
    return (
        <p>Hello World {item ? item['location_name'] : 'No Current Item'}</p>
    )
}

export default ShopItem