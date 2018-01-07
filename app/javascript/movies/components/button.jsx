import React from 'react'
import MovieForm from '../components/movieForm'

export default class Button extends React.Component{
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.checkButtonStyle = this.checkButtonStyle.bind(this)
    this.checkFormStyle = this.checkFormStyle.bind(this)
    this.setInitialState = this.setInitialState.bind(this)
    this.state = {
      isButtonHidden: false,
      isFormHidden: true
    }
  }

  setInitialState() {
    this.setState({
      isButtonHidden: false,
      isFormHidden: true,
    })
  }

  checkButtonStyle() {
    return (this.state.isButtonHidden || !this.props.isSignedIn) ? 'none' : 'block'
  }

  checkFormStyle() {
      return this.state.isFormHidden ? 'none' : 'block'
  }

  handleClick(e) {
    event.preventDefault(e)
    this.setState({isButtonHidden: !this.state.isButtonHidden, isFormHidden: false})
  }

  render () {
    return (
      <div>
        <button
          style={{display: this.checkButtonStyle()}}
          className={this.props.className}
          onClick={this.handleClick}>{this.props.label}
        </button>
        {!this.state.isFormHidden && <MovieForm setInitialState={this.setInitialState} categories={this.props.categories} />}
      </div>
    )
  }
}
