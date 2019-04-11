import React, {Fragment} from 'react'
import {observer, inject} from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import GalleryController from './gallery/controller/GalleryController'
import Spinner from './misc/Spinner'

@inject('rootStore')
@observer
export default class Root extends React.Component {
    render() {
        if (this.props.rootStore.isReady) {
            return <Fragment>
                <GalleryController/>
                <DevTools/>
            </Fragment>
        } else
            return <Spinner/>
    }
}