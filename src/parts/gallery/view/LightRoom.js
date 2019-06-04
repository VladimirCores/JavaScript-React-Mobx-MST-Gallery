import React from 'react'
import GalleryComponent from './base/GalleryComponent'

class LightRoom extends GalleryComponent {
	render() {
		return (
			<div className={this.className}>
				<h1>IMAGE VIEWER</h1>
				<h3>{this.props.title}</h3>
				<small>Press "Enter" to close</small>
				{this.props.children}
			</div>
		)
	}
}

export default LightRoom