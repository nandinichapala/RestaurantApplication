import {Component} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

class DishItem extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            increaseDishItemQuantity,
            decreaseDishItemQuantity,
          } = value
          const {dishDetails, activeCategoryId} = this.props
          const {
            addonCat,
            dishAvailability,
            dishCurrency,
            dishCalories,
            dishDescription,
            dishImage,
            dishName,
            dishId,
            dishPrice,
            dishType,
            quantity,
          } = dishDetails

          console.log(quantity)

          const onClickAddCartItem = () => {
            addCartItem({...dishDetails})
          }

          const onDecreamentQuantity = () => {
            decreaseDishItemQuantity(dishId, activeCategoryId)
          }

          const onIncreamentQuantity = () => {
            increaseDishItemQuantity(dishId, activeCategoryId)
          }

          return (
            <li className="list-item-container">
              <div className="veg-or-nonveg-details-description-container">
                {dishType === 2 ? (
                  <div className="green-label-container">
                    <div className="green-dot-container" />
                  </div>
                ) : (
                  <div className="red-label-container">
                    <div className="red-dot-container" />
                  </div>
                )}
                <div className="description-details-container">
                  <h1 className="dish-name">{dishName}</h1>
                  <p className="dish-price">
                    {dishCurrency} {dishPrice}
                  </p>
                  <p className="dish-description">{dishDescription}</p>
                  {dishAvailability ? (
                    <div className="increase-decrease-btn-addcart-btn-container">
                      <div className="increase-decrease-btn-container">
                        <button
                          className="quantity-btn"
                          type="button"
                          onClick={onDecreamentQuantity}
                        >
                          -
                        </button>
                        <p className="qantity">{quantity}</p>
                        <button
                          className="quantity-btn"
                          type="button"
                          onClick={onIncreamentQuantity}
                        >
                          +
                        </button>
                      </div>
                      {quantity > 0 ? (
                        <button
                          type="button"
                          className="addcart-btn"
                          onClick={onClickAddCartItem}
                        >
                          ADD TO CART
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    <p className="not-available-text">Not available</p>
                  )}
                  {addonCat.length !== 0 ? (
                    <p className="custom-text">Customizations available</p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <p className="dish-calories">{dishCalories} calories</p>
              <img src={dishImage} className="dish-image" alt="dishItem" />
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default DishItem
