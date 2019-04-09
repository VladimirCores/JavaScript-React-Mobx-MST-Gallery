import React from 'react'
import Gallery from './Gallery'
import Thumb from './Thumb'
import Keyboard from '../../consts/Keyboard'
import LightRoom from './LightRoom'
import Image from './Image'

import {observer} from 'mobx-react'
import DomElement from '../base/DomElement'

function GalleryController() {
    return observer(['galleryStore'], class extends DomElement {
        onDocumentKeyboardNavigation = (event) => {
            event.stopImmediatePropagation()
            event = event || window.event
            if (event.keyCode === Keyboard.ARROW_LEFT) {
                this.store.selectNext(-1)
            }
            else if (event.keyCode === Keyboard.ARROW_RIGHT) {
                this.store.selectNext(1)
            }
            else if (event.keyCode === Keyboard.ENTER) {
                this.store.toggleLightRoom()
            }
        }

        componentDidMount() {
            document.onkeydown = this.onDocumentKeyboardNavigation
        }

        componentWillUnmount() {
            document.onkeydown = null
        }

        renderLightRoom() {
            let imageVO = this.store.selectedImageVO
            return (
                <LightRoom title={imageVO.title}>
                    <Image width={imageVO.width}
                          height={imageVO.height}
                          url={imageVO.path + imageVO.name}/>
              </LightRoom>
            )
        }

        renderThumbs() {
            return this.store.images.map((imageVO, index) => {
                let thumbVO = imageVO.thumb
                return <Thumb key={index}
                              selected={this.store.isSelected(index)}
                              width={thumbVO.width}
                              height={thumbVO.height}
                              url={thumbVO.path + thumbVO.name}/>
            })
        }

        render() {
            return <>
                <Gallery> { this.renderThumbs() } </Gallery>
                { this.store.lightRoomShown ? this.renderLightRoom() : null }
            </>
        }
    })
}

export default GalleryController