import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Rating from '../components/rating'
import Button from './button'
import axios from 'axios'

export default class Movie extends React.Component {
  constructor(props) {
    super(props)
    this.handleUpdateRating = this.handleUpdateRating.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleUpdateRating = this.handleUpdateRating.bind(this)
    this.editMovie = this.editMovie.bind(this)
    this.state = {
      title: this.props.title,
      text: this.props.text,
      category_id: this.props.category_id,
      category: this.props.category,
      rating: this.props.mean_rating
    }
  }

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    category: PropTypes.string,
    mean_rating: PropTypes.number,
    signed_in: PropTypes.bool.isRequired
  }

  handleDeleteClick(e) {
    this.props.deleteMovie(e.target.id)
  }

  handleUpdateRating(rating) {
    axios.post('/ratings' + '.json', {withCredentials: true}, {
      data: {movie_id: this.props.movie_id, rating: rating},
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content,
        }
    })
    .then((response) => {
      this.setState({
        rating: rating
      })
    })
    .catch((error) => {
      // implement!
    });
  }

  editMovie(params) {
    axios.put('/movies/' + this.props.movie_id, {withCredentials: true}, {
      params: {title: params.title, text: params.text, category_id: params.category_id, mean_rating: params.rating},
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content,
        }
    })
    .then((response) => {
      if (response.status === 200) {
        this.setState({
          title: params.title,
          text: params.text,
          category_id: params.category_id,
          rating: params.rating,
          category: params.category
        })
      }
    })
    .catch((error) => {
      // implement!
    })
  }

  render() {
    const isSignedIn = this.props.signed_in
    return (
      <tr>
        <td>{this.state.title}</td>
        <td>{this.state.text}</td>
        <td>{this.state.category}</td>
        <td><Rating
              signed_in={isSignedIn}
              movie_id={this.props.movie_id}
              rating={this.state.rating}
              handleUpdateRating={this.handleUpdateRating}
            />
        </td>
        {isSignedIn &&
          <td>
            {this.props.editable &&
              <Button
                className='btn-primary'
                label='Edit'
                isSignedIn={isSignedIn}
                categories={this.props.categories}
                title={this.state.title}
                text={this.state.text}
                category={this.state.category}
                mean_rating={this.state.rating}
                submitForm={this.editMovie}
              />
            }
            {this.props.editable &&
              <button className='btn-primary' id={this.props.movie_id} onClick={this.handleDeleteClick}>Delete</button>
            }
          </td>
          }
      </tr>
    )
  }
}
