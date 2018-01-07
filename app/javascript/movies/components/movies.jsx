import React from 'react'
import ReactDOM from 'react-dom'
import Movie from '../components/movie'

export default class Movies extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const rows = []

    this.props.movie_list.forEach(movie => {
      rows.push(<Movie
        key={movie.id}
        editable={movie.editable}
        update={this.props.update}
        movie_id={movie.id}
        signed_in={this.props.signed_in}
        title={movie.title}
        text={movie.text}
        category={movie.category_name}
        mean_rating={movie.mean_rating}
        categories={this.props.categories} />
      )
    })

    return (
      <div className='col-sm-12'>
        <table className='table table-condensed table-bordered table-hover'>
          <thead>
            <tr>
              <td>Title</td>
              <td>Text</td>
              <td>Category</td>
              <td>Rating</td>
              <td>Actions</td>
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
