import './Card.css'

const Card = ({children}) => {
    return (
        <div className='card'>
            <div className='card-container'>
                {children}
            </div>
        </div>
    )
}

export default Card