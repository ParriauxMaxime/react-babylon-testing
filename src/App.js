import './App.css'

import React, {Component} from 'react'
import Quarto from './Quarto'

class App extends Component {
  render() {
    return (
    <div className="App">
      <Quarto appState={{show3D: true}} />
    </div>
  )}
}

export default App
