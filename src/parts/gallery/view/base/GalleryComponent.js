import React from 'react'

class GalleryComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            className: this.constructor.name
        }
    }

    get store() {
        return this.props.galleryStore
    }

    get className() {
        return this.state.className
    }
}

export default GalleryComponent