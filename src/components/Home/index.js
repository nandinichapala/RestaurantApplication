import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import TabListItem from '../TabListItem'
import DishItem from '../DishItem'

import CartContext from '../../context/CartContext'

class Home extends Component {
  state = {
    activeCategoryId: '11',
  }

  onChangeActiveTabId = menuCategoryId => {
    this.setState({activeCategoryId: menuCategoryId})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = dishesList => {
    
    const {activeCategoryId} = this.state

    const categoryWiseObj = dishesList.find(
      each => each.menuCategoryId === activeCategoryId,
    )
    const {categoryDishes} = categoryWiseObj

    return (
      <div className="main-container">
        <Header />
        <div className="content-container">
          <ul className="tabs-list-container">
            {dishesList.map(eachItem => (
              <TabListItem
                key={eachItem.menuCategoryId}
                eachTabItemDetails={eachItem}
                activeCategoryId={activeCategoryId === eachItem.menuCategoryId}
                onChangeActiveTabId={this.onChangeActiveTabId}
              />
            ))}
          </ul>
          <ul className="dish-list-container">
            {categoryDishes.map(eachDishItem => (
              <DishItem
                key={eachDishItem.dishId}
                dishDetails={eachDishItem}
                activeCategoryId={activeCategoryId}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderDishesItemCarts = (activeApiStatus, dishesList) => {
    switch (activeApiStatus) {
      case 'INPROGRESS':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView(dishesList)
      default:
        return null
    }
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {activeApiStatus, dishesList} = value
          return <>{this.renderDishesItemCarts(activeApiStatus, dishesList)}</>
        }}
      </CartContext.Consumer>
    )
  }
}

export default Home
