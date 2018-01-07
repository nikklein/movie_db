import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const movie_list = document.querySelector('#movies')
const signin_node = document.getElementById('signed_in')
const signin_data = JSON.parse(signin_node.getAttribute('data'))

ReactDOM.render(<App signed_in={signin_data} rows={10} />, movie_list)
