import './index.css'
import CartContext from '../../context/CartContext'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {eachDishDetails} = props
      const {dishImage, dishName, dishId, dishPrice, quantity} = eachDishDetails
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const onClickRemoveItemFromCart = () => {
        removeCartItem(dishId)
      }
      const onClickIncreaseCartItemQuantity = () => {
        incrementCartItemQuantity(dishId)
      }
      const onClickDecreaseCartItemQuantity = () => {
        decrementCartItemQuantity(dishId)
      }
      return (
        <li className='cart-dish-item-container'>
          <div className='dish-image-title-container'>
            <img src={dishImage} className='dish-item-image' role='img' />
            <p className='dish-item-name'>{dishName}</p>
          </div>
          <div className='dish-quantity-price-del-btn-container'>
            <div className='dish-item-quantity-container'>
              <button
                type='button'
                className='dish-item-decrease-btn'
                onClick={onClickDecreaseCartItemQuantity}
              >
                -
              </button>
              <p className='dish-item-quantity'>{quantity}</p>
              <button
                type='button'
                className='dish-item-increase-btn'
                onClick={onClickIncreaseCartItemQuantity}
              >
                +
              </button>
            </div>
            <div className='dish-item-price-del-btn-container'>
              <p className='dish-item-price'>
                Rs {quantity * dishPrice * 24}/-
              </p>
              <button
                type='button'
                className='dish-item-del-btn'
                onClick={onClickRemoveItemFromCart}
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
