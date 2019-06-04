import React from 'react'
import GalleryComponent from '../gallery/view/base/GalleryComponent'

class Spinner extends GalleryComponent {
	render() {
		return (
			<div className={this.className}>
				<div className={`${this.className}_spin`}></div>
			</div>
		)
	}
}

export default Spinner