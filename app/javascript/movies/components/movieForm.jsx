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
      title: '',
      text: '',
      category_id: this.props.categories[0].id,
      rating: 0
    }
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }

  handleTextChange(event) {
    this.setState({text: event.target.value})
  }

  handleCategoryChange(event) {
    this.setState({category_id: event.target.value})
  }

  handleUpdateRating(rating) {
    this.setState({rating:rating})
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/movies' + '.json', {withCredentials: true}, {
      data: {title:this.state.title, text:this.state.text, category_id:this.state.category_id, mean_rating:this.state.rating},
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content,
        }
    })
    .then( (response) => {
      this.props.setInitialState()
      // show updated
    })
    .catch((error) => {
      // implement!
    });

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
          <input type="text" value={this.state.text} onChange={this.handleTextChange} />
        </label><br/>
        <label>
          Category:
          <select type="select" onChange={this.handleCategoryChange} >
              {this.props.categories.map((el, i) => <option key={i} value={el.id}>{el.name}</option>)}
          </select>
        </label><br/>
        <label>
          Rating:
          <Rating signed_in={true} movie_id={this.props.movie_id} rating={this.state.rating} handleUpdateRating={this.handleUpdateRating} />
        </label><br/>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
