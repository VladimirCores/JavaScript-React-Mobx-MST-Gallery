import {types, applySnapshot, flow} from 'mobx-state-tree'
import GalleryStore from './gallery/model/GalleryStore'
import GalleryLoader from '../services/loaders/GalleryLoader'

const RootStore = types
    .model("RootStore", {
        galleryStore: GalleryStore,
    })
    .views(self => ({
        get isReady() {
            return self.galleryStore.amountOfImages > 0
        }
    }))
    .actions(self => ({
        loadData() {
            new GalleryLoader().load((data) => {
                self.galleryStore.setup(data)
            })
        },
        loadDataFlow: flow(function* loadDataFlow() {
            const response = yield GalleryLoader.fetch()
            const galleryData = yield response.json()
            applySnapshot(self.galleryStore, { data: galleryData })
        }),
    }))

export default RootStore