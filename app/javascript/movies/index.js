import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

const movie_list = document.querySelector('#movies')
const node = document.getElementById('signed_in')
const data = JSON.parse(node.getAttribute('data'))

ReactDOM.render(<App signed_in={data} />, movie_list)
