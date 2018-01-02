import React from 'react'
import ReactDOM from 'react-dom'
import Movie from '../components/movie'

export default class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rows = []

    this.props.movie_list.forEach((movie) => {
      rows.push(<Movie
        key={movie.id}
        signed_in={this.props.signed_in}
        title={movie.title}
        text={movie.text}
        category={movie.category.name}
        mean_rating={movie.mean_rating} />)
    })

    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td>Text</td>
              <td>Category</td>
              <td>Rating</td>
            </tr>
          </thead>
            <tbody>
              {rows}
            </tbody>
        </table>
      </div>
    )
  }
}
