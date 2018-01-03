import React from 'react'
import CategoryFilter from './categoryFilter'

export default class CategoryFilters extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    event.preventDefault(e)
    this.props.onInputChange({filterByCategory: e.target.id})
  }

  render() {
    return (
      <div>
        <p>Category Filter</p>
        <ul>
          <li><a href="#" id="" onClick={this.handleClick}>All</a></li>
          {this.props.categories.map(category => { return <CategoryFilter key={category.id} handleClick={this.handleClick} category_name={category.name} category_count={category.category_count} /> })}
          </ul>
      </div>
    )
  }
}
