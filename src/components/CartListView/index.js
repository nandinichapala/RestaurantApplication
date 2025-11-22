import './index.css'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <ul className="cart-list-container">
          {cartList.map(each => (
            <CartItem key={each.dishId} eachDishDetails={each} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
