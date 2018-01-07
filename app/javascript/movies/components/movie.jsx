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
  }

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    category: PropTypes.string,
    mean_rating: PropTypes.number,
    signed_in: PropTypes.bool.isRequired
  }

  handleDeleteClick(e) {
    axios.delete('/movies/' + e.target.id, {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content,
        }
    },
    {withCredentials: true})
    .then( (response) => {
      this.props.onInputChange
      // show updated
    })
    .catch((error) => {
      // implement!
    });
  }

  handleEditClick(e) {
    axios.put('/movies/' + e.target.id, {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content,
        }
    },
    {withCredentials: true})
    .then( (response) => {
      this.props.onInputChange
      // show updated
    })
    .catch((error) => {
      // implement!
    });
  }

  handleUpdateRating(rating) {
    axios.post('/ratings' + '.json', {withCredentials: true}, {
      data: {movie_id:this.props.movie_id, rating:rating},
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content,
        }
    })
    .then((response) => {
      this.props.onInputChange()
      this.props.update()
      // show updated
    })
    .catch((error) => {
      // implement!
    });
  }

  render() {
    const isSignedIn = this.props.signed_in

    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.text}</td>
        <td>{this.props.category}</td>
        <td><Rating signed_in={isSignedIn} movie_id={this.props.movie_id} rating={this.props.mean_rating} handleUpdateRating={this.handleUpdateRating} /></td>
          <td>
              { this.props.editable &&<Button
                className='btn-primary'
                label='Edit'
                isSignedIn={isSignedIn}
                categories={this.props.categories}
                title={this.props.title}
                text={this.props.text}
                category={this.props.category}
                rating={this.props.mean_rating}
              />}
            { this.props.editable &&<button className='btn-primary' id={this.props.movie_id} onClick={this.handleDeleteClick}>Delete</button>}
          </td>
      </tr>
    )
  }
}
