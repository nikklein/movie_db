import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Rating from '../components/rating'

export default class Movie extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    category: PropTypes.string,
    mean_rating: PropTypes.number,
    signed_in: PropTypes.bool.isRequired
  }

  render() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.text}</td>
        <td>{this.props.category}</td>
        <td><Rating signed_in={this.props.signed_in} movie_id={this.props.movie_id} rating={this.props.mean_rating} /></td>
      </tr>
    );
  }
}

