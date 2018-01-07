import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

const movie_list = document.querySelector('#movies')
const signin_node = document.getElementById('signed_in')
const signin_data = JSON.parse(signin_node.getAttribute('data'))

const pagination_node = document.getElementById('pages')
const pagination_data = JSON.parse(pagination_node.getAttribute('data'))

ReactDOM.render(<App signed_in={signin_data} totalEntries={pagination_data} />, movie_list)
