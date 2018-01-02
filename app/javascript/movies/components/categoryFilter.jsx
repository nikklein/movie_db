import React from 'react'

export default class CategoryFilter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <li><a href="#" id={this.props.category_name} onClick={this.props.handleClick}>{this.props.category_name}</a></li>
      </div>
    )
  }
}
