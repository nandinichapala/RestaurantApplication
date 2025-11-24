import './App.css'
import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'

const apisStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

class App extends Component {
  state = {
    cartList: [],
    restaurantName: '',
    activeApiStatus: apisStatus.initial,
    dishesList: [],
    quantity: 0,
  }

  componentDidMount() {
    this.getDishesList()
  }

  getDishesList = async () => {
    this.setState({activeApiStatus: apisStatus.inProgress})
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const data = await response.json()

    const {quantity} = this.state
    console.log(data)
    const updatedList = data[0].table_menu_list.map(eachObj => ({
      menuCategory: eachObj.menu_category,
      menuCategoryId: eachObj.menu_category_id,
      menuCategoryImage: eachObj.menu_category_image,
      categoryDishes: eachObj.category_dishes.map(each => ({
        addonCat: each.addonCat,
        dishAvailability: each.dish_Availability,
        dishType: each.dish_Type,
        dishCalories: each.dish_calories,
        dishCurrency: each.dish_currency,
        dishDescription: each.dish_description,
        dishId: each.dish_id,
        dishImage: each.dish_image,
        dishName: each.dish_name,
        dishPrice: each.dish_price,
        quantity: quantity,
      })),
    }))

    const restaurantName = data[0].restaurant_name

    this.setState({
      dishesList: updatedList,
      activeApiStatus: apisStatus.success,
      restaurantName,
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = dish => {
    const {cartList} = this.state

    const dishObject = cartList.find(each => each.dishId === dish.dishId)

    if (dishObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (dish.dishId === eachItem.dishId) {
            const updatedQuantity = eachItem.quantity + dish.quantity
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, {...dish, quantity: 1}],
      }))
    }
  }

  removeCartItem = dishId => {
    const {cartList} = this.state
    const updatedList = cartList.filter(each => each.dishId !== dishId)
    this.setState({cartList: updatedList})
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.dishId === dishId) {
          const updatedQuantity = each.quantity + 1
          return {...each, quantity: updatedQuantity}
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const cartObj = cartList.find(each => each.dishId === dishId)
    if (cartObj.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.dishId === dishId) {
            const updatedQuantity = each.quantity - 1
            return {...each, quantity: updatedQuantity}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(dishId)
    }
  }

  increaseDishItemQuantity = (dishId, activeCategoryId) => {
    this.setState(prevState => ({
      dishesList: prevState.dishesList.map(each => {
        console.log(each)
        if (each.menuCategoryId === activeCategoryId) {
          return each.categoryDishes.map(eachItem => {
            if (eachItem.dishId === dishId) {
              const updatedQuantity = eachItem.quantity + 1
              return {...eachItem, quantity: updatedQuantity}
            }
            return eachItem
          })
        }
      }),
    }))
  }

  render() {
    const {cartList, restaurantName, activeApiStatus, dishesList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          restaurantName,
          activeApiStatus,
          dishesList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          increaseDishItemQuantity: this.increaseDishItemQuantity,
          decreaseDishItemQuantity: this.decreaseDishItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
