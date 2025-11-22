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
    activeApiStatus: apisStatus.initial,
    activeCategoryId: '11',
    dishesList: [],
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
      })),
    }))
    this.setState({
      dishesList: updatedList,
      activeApiStatus: apisStatus.success,
    })
  }

  onChangeActiveTabId = menuCategoryId => {
    this.setState({activeCategoryId: menuCategoryId})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {dishesList, activeCategoryId} = this.state

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
              <DishItem key={eachDishItem.dishId} dishDetails={eachDishItem} />
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
