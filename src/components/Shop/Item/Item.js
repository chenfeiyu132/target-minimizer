import './Item.css'
import { Html5Entities } from 'html-entities'

const ShopItem = ({ item }) => {
    const NUM_STORES = 3;
    return (
        <div className='item'>
            <img src={item.image_url} alt='item'/>
            <div className='item-container'>
                <h3>{Html5Entities.decode(item.name)}</h3>
                <p>TCIN: {item.tcin}</p>
                
                <p>Price: ${item.min_cost}</p>
                <p>Sample Cheapest Store(s): {item.min_stores['name'].slice(0, NUM_STORES).map((name, index) => `${name}(${item.min_stores['id'][index]})`).join(' and ')}</p>
            </div>
        </div>
    )
}

export default ShopItem