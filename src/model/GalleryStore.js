import GalleryLoader from './loader/GalleryLoader'
import {observable, action} from 'mobx'

const galleryStore = observable({
    selectedIndex: 0,
    lightRoomVisible: false,
    dataLoading: false,
    data: null,

    isSelected(index) {
        return this.selectedIndex === index
    },

    get images() {
        return this.data ? this.data.images : []
    },

    get amountOfImages() {
        return this.images.length
    },

    get selectedImageVO() {
        return this.images[this.selectedIndex]
    },

    get selectedImageUrl() {
        const vo = this.selectedImageVO
        return vo.path + vo.name
    }
});

galleryStore.toggleLightRoom = action(() => {
    galleryStore.lightRoomVisible = !galleryStore.lightRoomVisible
})

galleryStore.selectNext = action((offset) => {
    let amountOfImages = galleryStore.amountOfImages
    let nextSelectedIndex = galleryStore.selectedIndex + offset
    nextSelectedIndex = (nextSelectedIndex < 0 ? amountOfImages - 1 : nextSelectedIndex) % amountOfImages
    galleryStore.selectedIndex = nextSelectedIndex
})

galleryStore.requestData = action(() => {
    galleryStore.dataLoading = true
    new GalleryLoader().load((data) => {
        galleryStore.dataLoading = false
        galleryStore.data = data
    })
});

export default galleryStore