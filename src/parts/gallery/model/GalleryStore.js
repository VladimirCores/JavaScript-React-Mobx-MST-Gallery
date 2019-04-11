import {observable, action, computed} from 'mobx'
import {applySnapshot, types} from 'mobx-state-tree'
import Thumb from '../view/Thumb'

export const ThumbData = types.model('ThumbData', {
    width: types.number,
    height: types.number,
    path: types.string,
    name: types.string
})

export const ImageData = types.model('ImageData', {
    id: types.identifier,
    title: types.string,
    thumb: ThumbData,
    width: types.integer,
    height: types.integer,
    path: types.string,
    name: types.string
})

export const GalleryData = types.model('GalleryData', {
    images: types.array(ImageData)
}).actions(self => ({
    setup(images) { applySnapshot(self, images) }
}))

const GalleryStore = types
    .model('GalleryStore', {
        data: types.optional(GalleryData, {}),
        selectedIndex: types.optional(types.integer, 0),
        lightRoomVisible: types.optional(types.boolean, false)
    })
    .views(self => ({
        isSelected(index) {
            return self.selectedIndex === index
        },
        get images() {
            return self.data ? self.data.images : []
        },
        get amountOfImages() {
            return self.images.length
        },
        get selectedImage() {
            return self.images[self.selectedIndex]
        },
        get selectedImageUrl() {
            const img = self.selectedImage
            return img.path + img.name
        }
    }))
    .actions(self => ({
        toggleLightRoom() {
            self.lightRoomVisible = !self.lightRoomVisible
        },
        selectNext(offset) {
            let amountOfImages = self.amountOfImages
            let nextSelectedIndex = self.selectedIndex + offset
            nextSelectedIndex = (nextSelectedIndex < 0 ? amountOfImages - 1 : nextSelectedIndex) % amountOfImages
            self.selectedIndex = nextSelectedIndex
        },
        setup(galleryData) {
            self.data.setup(galleryData)
            // Another way how to setup
            // applySnapshot(self, { data: galleryData })
        }
    }))

export default GalleryStore