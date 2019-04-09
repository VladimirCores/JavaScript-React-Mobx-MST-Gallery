import React from 'react'
import DomElement from './base/DomElement'
import Spinner from './misc/Spinner'
import GalleryController from './gallery/GalleryController'
import {observer} from 'mobx-react'

export default observer(['galleryStore'], class extends DomElement {
    renderGallery() {
        let Controller = GalleryController()
        return <Controller/>
    }

    render() { return this.store.dataLoading ? <Spinner/> : this.renderGallery() }
})