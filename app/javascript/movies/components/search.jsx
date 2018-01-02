import React from 'react'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    event.preventDefault(e)
    this.props.onInputChange({filtered_text: e.target.value})
  }

  render() {
    return (
      <div>
        <label>Search</label>
        <input type="text" onKeyUp={this.handleChange}/>
      </div>
    )
  }
}
