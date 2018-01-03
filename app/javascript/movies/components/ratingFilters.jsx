import React from 'react'
import RatingFilter from './ratingFilter'

export default class RatingFilters extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    event.preventDefault(e)
    this.props.onInputChange({ratingFilter: e.target.id})
  }

  render() {
    return (
      <div>
        <p>Filter by Rating</p>
        <ul>
          {this.props.ratings.map(rating => { return <RatingFilter key={rating.id} id={rating.id} handleClick={this.handleClick} rating_name={rating.name} rating_count={rating.rating_count} /> })}
        </ul>
      </div>
    )
  }
}
