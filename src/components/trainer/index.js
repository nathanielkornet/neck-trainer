import React, { Component } from 'react'

const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

function getRandomNote (noteList, prevNoteIdx) {
  let noteIdx = prevNoteIdx

  while (noteIdx === prevNoteIdx ){
    noteIdx = Math.floor(Math.random() * (noteList.length));
  }

  return noteIdx
}

export default class Trainer extends Component {
  constructor (props) {
    super(props)

    const { stringNames, startFret, endFret } = props

    this.notePool = []

    stringNames.forEach(stringName => {
      // get the string's note name from the string name by removing last char.
      // Ex: 'E0' => 'E', 'Ab0' => 'Ab'
      const stringNote = stringName.slice(0, -1)

      const stringNoteIdx = notes.indexOf(stringNote)
      let j = stringNoteIdx

      for (var i = startFret; i < endFret + 1; i++) {
        this.notePool.push({
          note: (i > 11 ? 'high' : '') + notes[j],
          stringName: stringNote
        })

        if (j + 1 > notes.length - 1) {
          // index would be out of bounds, loop back to beginning of notes
          j = 0
        } else {
          j++
        }
      }
    })

    // console.log(this.notePool)

    this.state = { currentNoteIdx: getRandomNote(this.notePool, null) }

    this.setRandomNote = () => this.setState({
      currentNoteIdx: getRandomNote(this.notePool, this.state.currentNoteIdx)
    })

    this.interval = window.setInterval(this.setRandomNote, 1000)
  }
  componentWillUnmount () {
    window.clearInterval(this.interval)
  }
  render () {
    const { currentNoteIdx } = this.state
    return (
      <div>
        <p>Trainer be trainin'</p>
        <p>{this.notePool[currentNoteIdx].note}</p>
      </div>
    )
  }
}
