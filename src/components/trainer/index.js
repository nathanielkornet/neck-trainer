import React, { Component } from 'react'

const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

function getRandomNote (noteList, prevNoteIdx) {
  let noteIdx = prevNoteIdx

  while (noteIdx === prevNoteIdx ){
    noteIdx = Math.floor(Math.random() * (noteList.length));
  }

  return noteIdx
}

function generateNotePool (stringNames, startFret, endFret) {
  const notePool = []

  stringNames.forEach(stringName => {
    // get the string's note name from the string name by removing last char.
    // Ex: 'E0' => 'E', 'Ab3' => 'Ab'
    const stringNote = stringName.slice(0, -1)

    // get the octave number form the string name.
    // Ex: 'E0' => 0, 'Ab3' => 3
    const stringNoteOctave = Number(
      stringName.slice(stringName.length - 1, stringName.length)
    )

    const stringNoteIdx = notes.indexOf(stringNote)

    // this might be the first note's index, but it might
    // be out of bounds of the array.
    const maybeFirstNoteIdx = stringNoteIdx + startFret

    // assign note index of start fret
    const firstNoteIdx = maybeFirstNoteIdx > notes.length - 1
      ? maybeFirstNoteIdx - notes.length // TODO: breaks at 23 on A string. need to account for higher frets
      : maybeFirstNoteIdx

    // assign octave of start fret's note. would be an octave higher
    // than the string's octave if we'd be out of array bounds.
    const firstNoteOctave = maybeFirstNoteIdx > notes.length - 1
      ? stringNoteOctave + 1
      : stringNoteOctave

    let octave = firstNoteOctave
    let j = firstNoteIdx

    for (var i = startFret; i < endFret + 1; i++) {
      notePool.push({
        name: notes[j],
        fret: i,
        octave: octave,
        stringName: stringNote
      })

      if (j + 1 > notes.length - 1) {
        // index would be out of bounds, loop back to beginning of notes.
        j = 0

        // this also means we've moved up an octave
        octave++
      } else {
        j++
      }
    }
  })

  return notePool
}

export default class Trainer extends Component {
  constructor (props) {
    super(props)

    const { stringNames, startFret, endFret, interval = 1000 } = props

    this.notePool = generateNotePool(stringNames, startFret, endFret)

    console.log('note pool', this.notePool)

    // The "note" index is stored rather than the note name because the
    // "notes" in this.notePool are objects containing note data.
    // This makes it possible to differentiate them when selecting a new note.
    this.state = {
      currentNoteIdx: getRandomNote(this.notePool, null)
    }

    this.setRandomNote = () => this.setState({
      currentNoteIdx: getRandomNote(this.notePool, this.state.currentNoteIdx)
    })

    this.interval = window.setInterval(this.setRandomNote, interval)
  }

  componentWillUnmount () {
    window.clearInterval(this.interval)
  }

  render () {
    const { currentNoteIdx } = this.state
    const noteData = this.notePool[currentNoteIdx]

    return (
      <div>
        <p>
          {noteData.fret > 23 ? 'really ' : ''}
          {noteData.fret > 11 ? 'high ' : ''}
          {`${noteData.name} on the ${noteData.stringName} string`}
        </p>
      </div>
    )
  }
}
