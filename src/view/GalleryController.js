import React, {Fragment} from 'react'
import {observer, inject} from 'mobx-react'

import Keyboard from '../consts/Keyboard'
import DomElement from './base/DomElement'
import Spinner from './misc/Spinner'
import Gallery from './gallery/Gallery'
import Thumb from './gallery/Thumb'
import LightRoom from './gallery/LightRoom'

@inject('galleryStore') @observer
export default class GalleryController extends DomElement {

	onDocumentKeyboardNavigation = (event) => {
		event = event || window.event
		event.stopImmediatePropagation()
		switch (event.keyCode) {
			case Keyboard.ARROW_LEFT  : this.store.selectNext(-1);    break
			case Keyboard.ARROW_RIGHT : this.store.selectNext(1);     break
			case Keyboard.ENTER       : this.store.toggleLightRoom(); break
		}
	}

	componentDidMount() {
		document.onkeydown = this.onDocumentKeyboardNavigation
	}

	componentWillUnmount() {
		document.onkeydown = null
	}

	renderThumbs = () => this.store.images.map((image, index) => {
		return <Thumb key={index} data={image.thumb}/>
	})

	renderGallery = () =>
		<Fragment>
			<Gallery> {this.renderThumbs()} </Gallery>
			<LightRoom data={this.store.selected}/>
		</Fragment>

	render() {
		console.log("re-render");
		return this.store.dataLoading ? <Spinner/> : this.renderGallery()
	}
}