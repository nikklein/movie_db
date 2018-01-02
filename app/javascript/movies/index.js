import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'


const node = document.getElementById('signed_in')
const data = JSON.parse(node.getAttribute('data'))

const movie_list = document.querySelector('#movies')

ReactDOM.render(<App signed_in={data} />, movie_list)
