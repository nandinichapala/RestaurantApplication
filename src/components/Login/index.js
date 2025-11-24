import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  renderSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  renderFailureView = errorMsg => {
    this.setState(prevState => ({
      showErrorMsg: !prevState.showErrorMsg,
      errorMsg,
    }))
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.renderSuccessView(data.jwt_token)
    } else {
      this.renderFailureView(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card-container">
          <h1 className="login-card-heading">Login</h1>
          <form
            className="login-card-form-container"
            onSubmit={this.onSubmitLoginForm}
          >
            <div className="login-card-input-container">
              <label className="input-label" htmlFor="username">
                username
              </label>
              <input
                type="text"
                className="input-container"
                onChange={this.onChangeUsernameInput}
                id="username"
                value={username}
                placeholder="Username"
              />
            </div>
            <div className="login-card-input-container">
              <label className="input-label" htmlFor="password">
                password
              </label>
              <input
                type="password"
                className="input-container"
                onChange={this.onChangePasswordInput}
                id="password"
                value={password}
                placeholder="Password"
              />
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
            {showErrorMsg ? <p className="Error-msg">*{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
