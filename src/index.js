import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'mobx-react'
import GalleryStore from './model/GalleryStore'
import GalleryController from './view/GalleryController'

ReactDOM.render(
	<Provider galleryStore={new GalleryStore()}>
		<GalleryController/>
	</Provider>,
	document.getElementById('Root')
)
