
import React from 'react'
import Search from './search'
import Movies from './movies'
import CategoryFilters from './categoryFilters'
import axios from 'axios'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.findMovies = this.findMovies.bind(this)
    this.state = {
      movie_list: [],
      categories: [],
    };
  }

  findMovies(params = {}) {
    axios.get('/movies' + '.json', {
      params: {filtered_text: params.filtered_text, categories: params.categories, categoryFilter: params.filterByCategory},
      headers: {
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
        }
    })
    .then( (response) => {
      this.setState({movie_list: response.data.movies, categories: response.data.categories});
    })
    .catch((error) => {
      // implement!
    });
  }

  onInputChange(input_text) {
    this.findMovies(input_text)
  }

  componentDidMount() {
    this.findMovies(this.state)
  }

  render() {
    return (
      <div>
        <CategoryFilters categories={this.state.categories} onInputChange={this.onInputChange} />
        <Search filteredText={this.state.filteredText} onInputChange={this.onInputChange} />
        <Movies signed_in={this.props.signed_in} movie_list={this.state.movie_list} />
      </div>
    )
  }
}
