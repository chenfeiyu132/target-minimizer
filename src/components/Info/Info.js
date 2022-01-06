import './Info.css'

const Info = () => {
    return (
        <div className='info-wrapper'>
            <p>
                The search tool essentially provides you the cheapest Target store locations for inputted item TCIN
            </p>
            <p>
                Now you might be wondering...How on earth would that be useful?
                Well, let me tell you a little saving trick that Target doesn't want you to know.
            </p>
            <p>
                When you checkout online, Target uses the home store you set to calculate the price of the items in your cart.
                However, you can choose to pick up the items wherever you desire.
                Thus, you can set the cheapest store for your items as your home store and pick up the items at your actual store. 
            </p>
            <p>
                For example, you could set your homestore on the top left corner to be Bowling Green, KY(which has eggs going for .69 cents), and set the pick up location to be Champaign Campus Town, IL(which has eggs for 1.39).
                Boom, you just saved 70 cents per carton of eggs. You can do this on hundreds of items at Target(however not all), there's usually price discrepencies for common every items like eggs and milk.
            </p>
        </div>
    )
}

export default Info;