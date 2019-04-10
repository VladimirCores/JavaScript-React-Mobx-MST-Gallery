import React, { Fragment } from 'react'
import {observer} from 'mobx-react'
import Keyboard from '../consts/Keyboard'
import DomElement from './base/DomElement'
import Spinner from './misc/Spinner'
import Gallery from './gallery/Gallery'
import Thumb from './gallery/Thumb'
import LightRoom from './gallery/LightRoom'
import Image from './gallery/Image'

export default observer(['galleryStore'], class extends DomElement
{
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

    get selectedImage() { return this.store.selectedImageVO }

    renderLightRoom = () =>
        <LightRoom title={this.selectedImage.title}>
            <Image width={this.selectedImage.width}
                   height={this.selectedImage.height}
                   url={this.store.selectedImageUrl}
            />
        </LightRoom>

    renderThumbs = () => this.store.images.map((imageVO, index) => {
        let thumbVO = imageVO.thumb
        return <Thumb key={index}
          selected={this.store.isSelected(index)}
          width={thumbVO.width}
          height={thumbVO.height}
          url={thumbVO.path + thumbVO.name}
        />
    })

    renderGallery = () =>
        <Fragment>
            <Gallery> { this.renderThumbs() } </Gallery>
            { this.store.lightRoomVisible && this.renderLightRoom() }
        </Fragment>

    render() { return this.store.dataLoading ? <Spinner/> : this.renderGallery() }
})