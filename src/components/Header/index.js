import './index.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {Link, withRouter} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, restaurantName} = value

        return (
          <nav className="nav-container">
            <Link to="/" className="nav-link">
              <button type="button" className="home-btn">
                <h1 className="nav-heading">{restaurantName}</h1>
              </button>
            </Link>
            <div className="cart-text-img-container">
              <p className="my-orders-text">My Orders</p>
              <Link to="/cart" className="nav-link">
                <button type="button" className="cart-btn" data-testid="cart">
                  <AiOutlineShoppingCart className="cart-image" />
                </button>
              </Link>
              <div className="quantity-container">
                <p className="quantity-count">{cartList.length}</p>
              </div>

              <button
                type="button"
                className="logout-btn"
                onClick={onClickLogoutBtn}
              >
                Logout
              </button>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
