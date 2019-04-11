import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'mobx-react'
import RootStore from './parts/RootStore'
import Root from './parts/Root'

const rootStore = new RootStore();
const stores = {
    rootStore: rootStore,
    galleryStore: rootStore.galleryStore
}

ReactDOM.render(
    <Provider {...stores}>
        <Root/>
    </Provider>,
    document.getElementById('Root')
)

rootStore.requestData();
