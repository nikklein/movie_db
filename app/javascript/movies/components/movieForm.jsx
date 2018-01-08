import React from 'react'
import Rating from '../components/rating'
import axios from 'axios'

export default class MovieForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleUpdateRating = this.handleUpdateRating.bind(this)
    this.state = {
      title: this.props.title || '',
      text: this.props.text || '',
      category_id: this.props.categories[0]['id'],
      category: this.props.categories[0]['name'],
      rating: this.props.mean_rating || 0
    }
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }

  handleTextChange(event) {
    this.setState({text: event.target.value})
  }

  handleCategoryChange(event) {
    this.setState({category_id: event.target.value, category: event.target.options[event.target.selectedIndex].text})
  }

  handleUpdateRating(rating) {
    this.setState({rating:rating})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitForm({
      title: this.state.title,
      text: this.state.text,
      category_id: this.state.category_id,
      category: this.state.category,
      rating: this.state.rating
    })
  }

  setDefaultValue() {
    let category = this.props.categories.filter(category => category['name'] === this.props.category)
    if (category && category.length === 1) {
      return category[0]['id']
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
        </label><br/>
        <label>
          Text:
          <textarea type="text" value={this.state.text} onChange={this.handleTextChange} />
        </label><br/>
        <label>
          Category:
          <select type="select" defaultValue={this.setDefaultValue()} onChange={this.handleCategoryChange} >
              {this.props.categories.map((el, i) => <option key={i} value={el.id}>{el.name}</option>)}
          </select>
        </label><br/>
        <label>
          Rating:
          <Rating
            signed_in={true}
            movie_id={this.props.movie_id}
            rating={this.state.rating}
            handleUpdateRating={this.handleUpdateRating}
          />
        </label><br/>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
