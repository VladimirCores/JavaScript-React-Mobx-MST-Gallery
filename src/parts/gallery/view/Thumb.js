import React from 'react'
import GalleryComponent from './base/GalleryComponent'

class Thumb extends GalleryComponent {
	get className() {
		return super.className + (this.props.selected ? ' highlight' : '')
	}

	componentDidUpdate() {
		if (this.props.selected)
			this.refs.dom.scrollIntoView(false)
	}

	render() {
		const style = {
			width: this.props.width,
			height: this.props.height,
			backgroundImage: `url(${this.props.url})`
		}
		return (
			<div className={this.className} ref="dom" style={style}/>
		)
	}
}

export default Thumb