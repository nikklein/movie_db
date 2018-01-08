import React from 'react'
import MovieForm from '../components/movieForm'

export default class Button extends React.Component{
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.toggleButton = this.toggleButton.bind(this)
    this.checkFormStyle = this.checkFormStyle.bind(this)
    this.setInitialState = this.setInitialState.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.state = {
      isButtonHidden: true,
      isFormHidden: true
    }
  }

  setInitialState() {
    this.setState({
      isButtonHidden: false,
      isFormHidden: true,
    })
  }

  toggleButton() {
    return (this.state.isButtonHidden || !this.props.isSignedIn) ? this.props.label : 'Hide'
  }

  submitForm(params) {
    event.preventDefault()
    this.props.submitForm(params)
    this.setState({isFormHidden: this.checkFormStyle(), isButtonHidden: this.toggleButton()})
  }

  checkFormStyle() {
    return this.state.isFormHidden ? 'none' : 'block'
  }

  handleClick(e) {
    event.preventDefault(e)
    this.setState({isButtonHidden: !this.state.isButtonHidden, isFormHidden: !this.state.isButtonHidden})
  }

  render () {
    return (
      <div className="row">
        <div className="col-sm-4">
          <button
            type="button"
            className={this.props.className}
            onClick={this.handleClick}>{this.toggleButton()}
          </button>
        </div>
        <div className="col-sm-6">
          {!this.state.isFormHidden &&
            <MovieForm
            setInitialState={this.setInitialState}
            categories={this.props.categories}
            title={this.props.title}
            text={this.props.text}
            category={this.props.category}
            mean_rating={this.props.mean_rating}
            submitForm={this.submitForm}
          />}
        </div>
      </div>
    )
  }
}
