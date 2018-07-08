import React, { Component } from 'react'
import Form from './components/form'
import Trainer from './components/trainer'

export default class App extends Component {
  constructor () {
    super()

    this.state = {
      isRunning: false
    }

    this.toggleIsRunning = () => this.setState({isRunning: !this.state.isRunning})
  }
  render () {
    return <div>
      <h1>Learn you a neck</h1>
      <h2>the shit {this.state.isRunning ? 'is' : 'is not'} running</h2>
      {this.state.isRunning
        ? <Trainer stringNames={['E1']} startFret={0} endFret={24} interval={188}/>
        : <Form />
      }
      <button onClick={this.toggleIsRunning}>
        flip the shit
      </button>
    </div>
  }
}
