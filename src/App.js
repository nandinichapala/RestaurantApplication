import './App.css'
import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'

class App extends Component {
  state = {
    cartList: [],
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
        cartList: [...prevState.cartList, {...dish}],
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

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
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
