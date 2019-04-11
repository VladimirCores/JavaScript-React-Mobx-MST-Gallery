import React from 'react'
import GalleryComponent from './base/GalleryComponent'

class Gallery extends GalleryComponent {
    render() {
        return (
            <div className={this.className}>
                <h1 style={{color: 'black'}}>IMAGE GALLERY</h1>
                {this.props.children}
            </div>
        )
    }
}

export default Gallery