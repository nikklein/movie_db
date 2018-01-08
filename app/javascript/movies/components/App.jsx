import React from 'react'
import Search from './search'
import Movies from './movies'
import CategoryFilters from './categoryFilters'
import RatingFilters from './ratingFilters'
import Button from './button'
import styles from '../components/rating.scss'
import axios from 'axios'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.findMovies = this.findMovies.bind(this)
    this.createMovie = this.createMovie.bind(this)
    this.state = {
      movie_list: [],
      categories: [],
      ratings: [],
      page: 1,
      rows_per_page: this.props.rows,
      totalEntries: 0
    }
  }

 initialPageNumber(){
  let total_rows = this.state.totalEntries
  let page = 1
  let rows = []
  for(var i = 0; i < total_rows; i += this.state.rows_per_page) {
    rows.push(page)
    page++
  }
  return rows
  }

  findMovies(params = {}) {
    axios.get('/movies' + '.json', {
      params: {
        filtered_text: params.filtered_text,
        categories: params.categories,
        categoryFilter: params.filterByCategory,
        ratingFilter: params.ratingFilter,
        page: params.page || this.state.page,
        per_page: this.state.rows_per_page
      },
    })
    .then((response) => {
      this.setState({movie_list: response.data.movies, categories: response.data.categories, ratings: response.data.ratings, totalEntries: response.data.total_entries })
    })
    .catch((error) => {
      // implement!
    })
  }

  createMovie(params) {
    axios.post('/movies', {withCredentials: true}, {
      data: {title: params.title, text: params.text, category_id: params.category_id, mean_rating: params.rating},
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content,
        }
    })
    .then( (response) => {
      this.findMovies()
      // show updated
    })
    .catch((error) => {
      // implement!
    });

  }

  onInputChange(input_text) {
    this.findMovies(input_text)
  }

  componentDidMount() {
    this.findMovies()
  }

  render() {
    const isSignedIn = this.props.signed_in

    return (
      <div>
        <h2 style={{textAlign: 'center'}}>Movie DB</h2><hr/>
        <div className="row">
          <div className="col-sm-4 pull-left">
            {isSignedIn && <Button className="btn-primary" label="Add movie" isSignedIn={isSignedIn} categories={this.state.categories} submitForm={this.createMovie} />}
          </div>
          <div className="col-sm-4">
            <CategoryFilters categories={this.state.categories} onInputChange={this.onInputChange} />
          </div>
          <div className="col-sm-4">
            <RatingFilters ratings={this.state.ratings} onInputChange={this.onInputChange} />
          </div>
        </div><hr/>
          <div className="row">
            <div className="col-sm-10">
              <Search filteredText={this.state.filteredText} onInputChange={this.onInputChange} />
            </div>
          </div>
          <div className="row">
            { this.state.movie_list.length > 0 &&
              <div className="col-sm-4">
              <ul className="pagination">
               {this.initialPageNumber().map((pageNumber) =>
                  <li key={pageNumber} className="page-item"><a href={"##"+pageNumber} className="page-link" onClick={() => this.findMovies({page: pageNumber})}>{pageNumber}</a></li>
               ) }
              </ul>
              </div>
            }
            { this.state.movie_list.length > 0 &&
              <div className="col-sm-12">
                <Movies signed_in={isSignedIn} movie_list={this.state.movie_list} categories={this.state.categories} updateMovieList={this.findMovies} />
              </div>
            }
          </div>
      </div>
      )
  }
}
