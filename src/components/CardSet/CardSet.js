import { Card } from '../index.js'
import './CardSet.css'

const CardSet = ({items}) => {
    return (
        <div className='column-grid'>
            {items.map((item) => 
            
                <Card>{item}</Card>
            )}
        </div>
    )
}

export default CardSet;