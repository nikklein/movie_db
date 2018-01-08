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
      <div className="input-group-addon">
        <input type="text" className="form-control" placeholder="Search movie" onKeyUp={this.handleChange}/>
      </div>
    )
  }
}
