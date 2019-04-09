import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'mobx-react'
import galleryStore from './model/GalleryStore'
import GalleryApplication from './view/GalleryApplication'

galleryStore.requestData();

ReactDOM.render(
    <Provider galleryStore={galleryStore}>
        <GalleryApplication/>
    </Provider>,
    document.getElementById('Root')
)
