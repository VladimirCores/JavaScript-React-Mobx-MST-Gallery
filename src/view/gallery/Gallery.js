import React from 'react'
import DomElement from '../base/DomElement'

class Gallery extends DomElement {
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