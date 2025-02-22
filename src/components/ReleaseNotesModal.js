import React, { Component } from 'react'
import '../css/ReleaseNotesModal.scss'

import Modal from './Modal'
import Button from './Button'

import { connect } from 'react-redux'
import { setLatestReleaseNotes } from '../actions/settingsActions'

const { ipcRenderer } = window.require('electron')

class ReleaseNotesModal extends Component {

  componentDidMount() {
    ipcRenderer.send('electron-updater', 'set-update-channel', this.props.updateChannel)
    ipcRenderer.send('electron-updater', 'check-for-updates')
  }

  render() {
    return (
      <div id="release-notes-modal">
        {require('../../package.json').version !== this.props.latestReleaseNotes ?
          <Modal width={ 600 } height={ 500 }  onClose={ () => { this.props.setLatestReleaseNotes(require('../../package.json').version) } }>
            <h1 style={ { marginTop: "0" } }>Release Notes for Version {require('../../package.json').version}</h1>
            <h2 style={ { color: 'lightgreen' } }>What's new?</h2>
            <hr style={ { borderColor: 'lightgreen' } } />
            <ul>
              <li>New option for song folder naming: <b>Key (Song Name - Song Artist)</b></li>
            </ul>
            <h2 style={ { color: 'salmon' } }>What's fixed?</h2>
            <hr style={ { borderColor: 'salmon' } } />
            <ul>
              <li>BeatDrop is now <b>compatible with the new BeatSaver API.</b></li>
              <li>UI now has <b>better compatibility with macOS.</b></li>
              <li>Implemented a bunch of <b>stability enhancements for playlists.</b></li>
              <li>Fixed a bug where <b>app would crash when moving to next song in queue after error.</b></li>
              <li>2.5.1: Fixed <b>bugs in new local song code.</b></li>
              <li>2.5.2: Fixed <b>crash when searching for songs.</b></li>
              <li>2.5.3: Fix <a href="https://github.com/StarGazer1258/BeatDrop/issues/45" onClick={ (e) => { e.preventDefault(); e.stopPropagation(); window.require('electron').shell.openExternal(e.target.href) } }>#45.</a> This is basically implemeting the new hashing calculation, so it should fix numerous issues, such as song not appearing as downloaded, songs showing the wrong leaderboards in-game, playlists not wokring properly, etc.</li>
            </ul>
            <br />
            <Button type="primary" onClick={ () => { this.props.setLatestReleaseNotes(require('../../package.json').version) } }>Awesome!</Button>
          </Modal>
        : null}
      </div>
    )
  }

}

const mapStateToProps = state => ({
  latestReleaseNotes: state.settings.latestReleaseNotes,
  updateChannel: state.settings.updateChannel
})

export default connect(mapStateToProps, { setLatestReleaseNotes })(ReleaseNotesModal)