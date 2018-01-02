import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

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
        <td>{this.signed_in ? 'hello' : this.props.mean_rating}</td>
      </tr>
    );
  }
}

