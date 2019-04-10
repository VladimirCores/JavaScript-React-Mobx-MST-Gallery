import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'mobx-react'
import galleryStore from './model/GalleryStore'
import GalleryController from './view/GalleryController'

galleryStore.requestData();

ReactDOM.render(
    <Provider galleryStore={galleryStore}>
        <GalleryController/>
    </Provider>,
    document.getElementById('Root')
)
