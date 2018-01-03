import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styles from '../components/rating.scss'
import axios from 'axios'


export default class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: this.props.rating,
      temp_rating: null,
    }
    this.rate = this.rate.bind(this)
    this.star_over = this.star_over.bind(this)
    this.star_out = this.star_out.bind(this)
    this.update_rating = this.update_rating.bind(this)
  }

  static propTypes = {
    disabled: PropTypes.bool
  }

  update_rating(rating) {
    axios.post('/ratings' + '.json', {withCredentials: true}, {
      data: {movie_id:this.props.movie_id, rating:rating},
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content,
        }
    })
    .then( (response) => {
      // show updated
    })
    .catch((error) => {
      // implement!
    });
  }

  rate(e) {
    this.update_rating(e.target.id)
    this.setState({
      rating: e.target.id,
      temp_rating: e.target.id
    })
  }

  star_over(e) {
    this.state.temp_rating = this.state.rating
    this.state.rating = e.target.id
    this.setState({
      rating: this.state.rating,
      temp_rating: this.state.temp_rating
    })
  }

  star_out() {
    this.state.rating = this.state.temp_rating;
    this.setState({ rating: this.state.rating })
  }

  render() {
    const isSignedIn = this.props.signed_in
    var stars = []
    for(let i = 1; i <= 5; i++) {
      var klass = 'star-rating-star '
      if (this.state.rating >= i && this.state.rating != null) {
        klass += ' is-selected'
      }
      if (isSignedIn) {
        var label =
          <label
          key={i}
          id={i}
          className={klass}
          onClick={this.rate}
          onMouseOver={this.star_over}
          onMouseOut={this.star_out}>
            ★
          </label>
      } else {
        var label =
          <label
            key={i}
            id={i}
            className={klass}>
            ★
          </label>
      }
      stars.push(label)
    }

    return (
      <div className="star-rating">
        {stars}
      </div>
    )
  }
}
