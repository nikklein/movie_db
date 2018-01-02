import React from 'react'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onInputChange(e.target.value)
  }

  render() {
    return (
      <div className="row">
        <div className="input-field">
          <label>Search</label>
          <input type="text" onKeyUp={this.handleChange}/>
        </div>
      </div>
    )
  }
}
