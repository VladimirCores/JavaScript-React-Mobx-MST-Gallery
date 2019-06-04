import React from 'react'
import GalleryComponent from './base/GalleryComponent'

class Image extends GalleryComponent {
	render() {
		const style = {
			width: this.props.width,
			height: 'auto'
		}
		return (
			<img className={this.className}
	     src={this.props.url} style={style}/>
		)
	}
}

export default Image
