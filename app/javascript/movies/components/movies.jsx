import React from 'react'
import ReactDOM from 'react-dom'
import Movie from '../components/movie'
import axios from 'axios'

export default class Movies extends React.Component {
  constructor(props) {
    super(props)
    this.deleteMovie = this.deleteMovie.bind(this)
  }

  deleteMovie(id) {
    axios.delete('/movies/' + id, {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content,
        }
    })
    .then((response) => {
      this.props.updateMovieList()
    })
    .catch((error) => {
      // implement!
    });
  }

  render() {
    const rows = []
    this.props.movie_list.forEach(movie => {
      rows.push(
        <Movie
          key={movie.id}
          editable={movie.editable}
          update={this.props.update}
          movie_id={movie.id}
          signed_in={this.props.signed_in}
          title={movie.title}
          text={movie.text}
          category={movie.category_name}
          mean_rating={movie.mean_rating}
          categories={this.props.categories}
          submitForm={this.props.submitForm}
          deleteMovie={this.deleteMovie}
        />
      )
    })

    return (
      <table className='table table-condensed table-borderless table-hover'>
        <thead>
          <tr>
            <td>Title</td>
            <td>Text</td>
            <td>Category</td>
            <td>Rating</td>
            {this.props.signed_in &&
              <td>Actions</td>
            }
          </tr>
        </thead>
          <tbody>
            {rows}
          </tbody>
      </table>
    )
  }
}
