import React from 'react'
import Gallery from './Gallery'
import Thumb from './Thumb'
import Keyboard from '../../consts/Keyboard'
import LightRoom from './LightRoom'
import Image from './Image'

function GalleryController(input) {

    let images = input;

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
            nextSelectedIndex = (nextSelectedIndex < 0 ? amountOfImages - 1 : nextSelectedIndex) % amountOfImages
            this.setState({selectedIndex:nextSelectedIndex})
        }

        toggleLightRoom() {
            this.setState({lightRoomShown:!this.state.lightRoomShown})
        }

        onDocumentKeyboardNavigation = (event) => {
            event.stopImmediatePropagation()
            event = event || window.event
            if (event.keyCode === Keyboard.ARROW_LEFT) {
                this.selectNext(-1)
            }
            else if (event.keyCode === Keyboard.ARROW_RIGHT) {
                this.selectNext(1)
            }
            else if (event.keyCode === Keyboard.ENTER) {
                this.toggleLightRoom()
            }
        }

        componentDidMount() {
            document.onkeydown = this.onDocumentKeyboardNavigation
        }

        componentWillUnmount() {
            document.onkeydown = null
        }

        renderLightRoom() {
            let imageVO = images[this.state.selectedIndex]
            return (
                <LightRoom>
                    <Image width={imageVO.width}
                          height={imageVO.height}
                          url={imageVO.path + imageVO.name}/>
              </LightRoom>
            )
        }

        renderThumbs() {
            return images.map((imageVO, index) => {
                let thumbVO = imageVO.thumb
                return <Thumb key={index}
                              selected={this.state.selectedIndex === index}
                              width={thumbVO.width}
                              height={thumbVO.height}
                              url={thumbVO.path + thumbVO.name}/>
            })
        }

        render() {
            return <div>
                <Gallery> { this.renderThumbs() } </Gallery>
                { this.state.lightRoomShown ? this.renderLightRoom() : null }
            </div>
        }
    }
}

export default GalleryController