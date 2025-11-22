import './index.css'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyCartView = cartList.length === 0
      const onClickRemoveAllItemsFromCart = () => {
        removeAllCartItems()
      }
      return (
        <div className="cart-main-container">
          <Header />
          {showEmptyCartView ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <h1 className="cart-heading">My Cart</h1>
              <button
                type="button"
                className="cart-remove-all-btn"
                onClick={onClickRemoveAllItemsFromCart}
              >
                Remove All
              </button>
              <CartListView />
            </div>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
