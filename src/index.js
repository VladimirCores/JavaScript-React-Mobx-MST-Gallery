import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'mobx-react'

import RootStore from './parts/RootStore'
import Root from './parts/Root'
import GalleryStore from './parts/gallery/model/GalleryStore'
import {onSnapshot} from 'mobx-state-tree'
import LocalStorageKeys from './consts/localstorage/LocalStorageKeys'

const galleryStore = GalleryStore.create({
    selectedIndex: parseInt(localStorage.getItem(LocalStorageKeys.GALLERY_SELECTED_INDEX)) || 0,
    // lightRoomVisible: !!localStorage.getItem(LocalStorageKeys.GALLERY_LIGHTROOM_VISIBLE)
});
const rootStore = RootStore.create({
    galleryStore: galleryStore
});
const stores = {
    rootStore: rootStore,
    galleryStore: galleryStore
}

ReactDOM.render(
    <Provider {...stores}>
        <Root/>
    </Provider>,
    document.getElementById('Root')
)

onSnapshot(galleryStore, snapshot => {
    localStorage.setItem(
        LocalStorageKeys.GALLERY_SELECTED_INDEX,
        snapshot.selectedIndex
    )

    // localStorage.setItem(
    //     LocalStorageKeys.GALLERY_LIGHTROOM_VISIBLE,
    //     snapshot.lightRoomVisible
    // )
})

rootStore.loadDataFlow();
// Another way of loading data
// rootStore.loadData();
