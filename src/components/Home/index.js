import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import TabListItem from '../TabListItem'
import DishItem from '../DishItem'

const apisStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    activeCategoryId: '11',
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
        quantity,
      })),
    }))

    const restaurantName = data[0].restaurant_name

    this.setState({
      dishesList: updatedList,
      activeApiStatus: apisStatus.success,
      restaurantName,
    })
  }

  onChangeActiveTabId = menuCategoryId => {
    this.setState({activeCategoryId: menuCategoryId})
  }

  renderLoadingView = () => {
    return (
      <div className="loader-container">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    )
  }

  increaseDishItemQuantity = (dishId, activeCategoryId) => {
    this.setState(prevState => ({
      dishesList: prevState.dishesList.map(eachCategory => {
        if (eachCategory.menuCategoryId === activeCategoryId) {
          const updatedCategoryDishes = eachCategory.categoryDishes.map(
            eachDish => {
              if (eachDish.dishId === dishId) {
                return {...eachDish, quantity: eachDish.quantity + 1}
              }
              return eachDish
            },
          )
          return {...eachCategory, categoryDishes: updatedCategoryDishes}
        }
        return eachCategory
      }),
    }))
  }

  decreaseDishItemQuantity = (dishId, activeCategoryId) => {
    this.setState(prevState => ({
      dishesList: prevState.dishesList.map(eachCategory => {
        if (eachCategory.menuCategoryId === activeCategoryId) {
          const updatedCategoryDishes = eachCategory.categoryDishes.map(
            eachDish => {
              if (eachDish.dishId === dishId && eachDish.quantity > 0) {
                return {...eachDish, quantity: eachDish.quantity - 1}
              }
              return eachDish
            },
          )
          return {...eachCategory, categoryDishes: updatedCategoryDishes}
        }
        return eachCategory
      }),
    }))
  }

  renderSuccessView = () => {
    const {activeCategoryId, dishesList, restaurantName} = this.state

    const categoryWiseObj = dishesList.find(
      each => each.menuCategoryId === activeCategoryId,
    )
    if (!categoryWiseObj) {
      return <div>No dishes found for this category</div>
    }
    const {categoryDishes} = categoryWiseObj

    return (
      <div className="main-container">
        <Header restaurantName={restaurantName} />
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
                increaseDishItemQuantity={this.increaseDishItemQuantity}
                decreaseDishItemQuantity={this.decreaseDishItemQuantity}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderDishesItemCarts = () => {
    const {activeApiStatus} = this.state
    switch (activeApiStatus) {
      case apisStatus.inProgress:
        return this.renderLoadingView()
      case apisStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderDishesItemCarts()}</>
  }
}

export default Home
