
import React from 'react'
import Search from './search'
import Movies from './movies'
import axios from 'axios'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.findMovies = this.findMovies.bind(this)
    this.state = {
      filterText: '',
      movie_list: [],
    };
  }

  findMovies(params) {
    axios.get('/movies' + '.json', {
      params: { filtered_text: params },
      headers: {
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
        }
    })
    .then( (response) => {
      this.setState({movie_list: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onInputChange(input_text) {
    this.findMovies(input_text)
  }

  componentDidMount() {
    this.findMovies()
  }

  render() {
    return (
      <div>
        <Search filterText={this.state.filterText} onInputChange={this.onInputChange}/>
        <Movies signed_in={this.props.signed_in} movie_list={this.state.movie_list}/>
      </div>
    )
  }
}
