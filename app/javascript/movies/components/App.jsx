import React from 'react'
import Search from './search'
import Movies from './movies'
import CategoryFilters from './categoryFilters'
import RatingFilters from './ratingFilters'
import Button from './button'
import axios from 'axios'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.handleClick = this.onInputChange.bind(this)
    this.findMovies = this.findMovies.bind(this)
    this.state = {
      movie_list: [],
      categories: [],
      ratings: [],
    }
  }

  findMovies(params = {}) {
    axios.get('/movies' + '.json', {
      params: {filtered_text: params.filtered_text, categories: params.categories, categoryFilter: params.filterByCategory, ratingFilter: params.ratingFilter},
    })
    .then( (response) => {
      this.setState({movie_list: response.data.movies, categories: response.data.categories, ratings: response.data.ratings});
    })
    .catch((error) => {
      // implement!
    })
  }

  onInputChange(input_text) {
    this.findMovies(input_text)
  }

  handleClick() {
    alert('clicked')
  }

  componentDidMount() {
    this.findMovies()
  }

  render() {
    const isSignedIn = this.props.signed_in

    return (
      <div>
        {isSignedIn && <Button label='Add movie' isSignedIn={isSignedIn} categories={this.state.categories} />}
        <CategoryFilters categories={this.state.categories} onInputChange={this.onInputChange} />
        <RatingFilters ratings={this.state.ratings} onInputChange={this.onInputChange} />
        <Search filteredText={this.state.filteredText} onInputChange={this.onInputChange} />
        <Movies signed_in={this.props.signed_in} movie_list={this.state.movie_list} categories={this.state.categories} />
      </div>
    )
  }
}
