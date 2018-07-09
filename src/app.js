import React, { Component } from 'react'
import Form from './components/form'
import Trainer from './components/trainer'

export default class App extends Component {
  constructor () {
    super()

    this.state = {
      isRunning: false,
      stringNames: ['E1', 'A1', 'D2', 'G2'],
      startFret: 1,
      endFret: 5,
      interval: 2000
    }

    this.toggleIsRunning = () => this.setState({isRunning: !this.state.isRunning})

    this.setAppParams = (stringNames, startFret, endFret, interval) =>
      this.setState({stringNames, startFret, endFret, interval})
  }
  render () {
    const { isRunning } = this.state
    return <div>
      <h1>Learn that neck</h1>
      <h2>the shit is {isRunning ? '' : ' not'} running</h2>
      {this.state.isRunning
        ? <Trainer {...this.state} />
        : <Form setAppParams={this.setAppParams} {...this.state} />
      }
      <button onClick={this.toggleIsRunning}>
        {isRunning ? 'stop' : 'start'}
        {' the shit'}
      </button>
    </div>
  }
}
