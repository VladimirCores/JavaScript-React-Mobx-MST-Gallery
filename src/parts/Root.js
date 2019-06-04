import React from 'react'
import {observer, inject} from 'mobx-react'
import GalleryController from './gallery/controller/GalleryController'
import Spinner from './misc/Spinner'

@inject('rootStore')
@observer
export default class App extends React.Component {
	render() {
		if (this.props.rootStore.isReady) {
			return <GalleryController/>
		} else
			return <Spinner/>
	}
}