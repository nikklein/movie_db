import React from 'react'

export default class RatingFilter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <li><a href="#" id={this.props.id} onClick={this.props.handleClick}>{this.props.rating_name} ({this.props.rating_count})</a></li>
      </div>
    )
  }
}
