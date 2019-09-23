import React from 'react'
import Gallery from './Gallery'
import Thumb from './Thumb'
import Keyboard from '../../consts/Keyboard'
import LightRoom from './LightRoom'
import Image from './Image'

function GalleryController(input) {

  let images = input

  return class extends React.Component {
    constructor() {
      super()
      this.state = {
        selectedIndex: 0,
        lightRoomShown: false
      }
    }

    selectNext(offset) {
      let amountOfImages = images.length
      let nextSelectedIndex = this.state.selectedIndex + offset
      nextSelectedIndex = (nextSelectedIndex < 0 ?
        amountOfImages - 1 : nextSelectedIndex) % amountOfImages

      this.setState({selectedIndex: nextSelectedIndex})
    }

    toggleLightRoom() {
      this.setState({lightRoomShown: !this.state.lightRoomShown})
    }

    componentDidMount() {
      document.onkeydown = this.onDocumentKeyboardNavigation
    }

    componentWillUnmount() {
      document.onkeydown = null
    }

    onDocumentKeyboardNavigation = (event) => {
      event.stopImmediatePropagation()
      event = event || window.event
      switch (event.keyCode) {
        case Keyboard.ARROW_LEFT: this.selectNext(-1); break
        case Keyboard.ARROW_RIGHT: this.selectNext(1); break
        case Keyboard.ENTER: this.toggleLightRoom(); break
      }
    }

    renderLightRoom() {
      let imageVO = images[this.state.selectedIndex]
      let imageUrl = imageVO.path + imageVO.name;
      return (
        <LightRoom>
          <Image width={imageVO.width} height={imageVO.height} url={imageUrl}/>
        </LightRoom>
      )
    }

    renderThumbs() {
      return images.map((imageVO, index) => {
        let thumbVO = imageVO.thumb
	      let thumbUrl = thumbVO.path + thumbVO.name
        let isSelected = this.state.selectedIndex === index

        return <Thumb
          key       = {index}
          selected  = {isSelected}
          url       = {thumbUrl}
          width     = {thumbVO.width}
          height    = {thumbVO.height}
        />
      })
    }

    render() {
      return <div>
        <Gallery> {this.renderThumbs()} </Gallery>
        {this.state.lightRoomShown ? this.renderLightRoom() : null}
      </div>
    }
  }
}

export default GalleryController