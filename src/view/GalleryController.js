import React, {Fragment} from 'react'
import {observer, inject} from 'mobx-react'

import Keyboard from '../consts/Keyboard'
import DomElement from './base/DomElement'
import Spinner from './misc/Spinner'
import Gallery from './gallery/Gallery'
import Thumb from './gallery/Thumb'
import LightRoom from './gallery/LightRoom'
import Image from './gallery/Image'

@inject('galleryStore')
@observer
export default class GalleryController extends DomElement {

	onDocumentKeyboardNavigation = (event) => {
		event = event || window.event
		event.stopImmediatePropagation()
		switch (event.keyCode) {
			case Keyboard.ARROW_LEFT: this.store.selectNext(-1); break
			case Keyboard.ARROW_RIGHT: this.store.selectNext(1); break
			case Keyboard.ENTER: this.store.toggleLightRoom(); break
		}
	}

	componentDidMount() {
		document.onkeydown = this.onDocumentKeyboardNavigation
	}

	componentWillUnmount() {
		document.onkeydown = null
	}

	get selectedImage() {
		return this.store.selectedImageVO
	}

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
			<Gallery> {this.renderThumbs()} </Gallery>
			{this.store.lightRoomVisible && this.renderLightRoom()}
		</Fragment>

	render() {
		return this.store.dataLoading ? <Spinner/> : this.renderGallery()
	}
}