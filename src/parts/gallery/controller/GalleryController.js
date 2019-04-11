import React, { Fragment } from 'react'
import {observer, inject} from 'mobx-react'
import Keyboard from '../../../consts/Keyboard'
import GalleryComponent from '../view/base/GalleryComponent'
import Gallery from '../view/Gallery'
import Thumb from '../view/Thumb'
import LightRoom from '../view/LightRoom'
import Image from '../view/Image'

@inject('galleryStore')
@observer
export default class GalleryController extends GalleryComponent
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

    get selectedImage() { return this.store.selectedImage }

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

    render() {
        return <Fragment>
            <Gallery> { this.renderThumbs() } </Gallery>
            { this.store.lightRoomVisible && this.renderLightRoom() }
        </Fragment>
    }
}