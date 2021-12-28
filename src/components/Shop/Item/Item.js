import './Item.css'
import { Html5Entities } from 'html-entities'

const ShopItem = ({ item }) => {
    const NUM_STORES = 3;
    return (
        <div className='wrapper'>
            <h3>{Html5Entities.decode(item.name)}</h3>
            <p>TCIN: {item.tcin}</p>
            <img src={item.image_url} alt='item'/>
            <p>Price: ${item.min_cost}</p>
            <p>Stores that carry: {item.min_stores['name'].slice(0, NUM_STORES).map((name, index) => `${name}(${item.min_stores['id'][index]})`).join(' and ')}</p>
        </div>
    )
}

export default ShopItem