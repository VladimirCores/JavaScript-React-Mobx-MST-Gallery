import GalleryLoader from './loader/GalleryLoader'
import {observable, action, computed} from 'mobx'

class GalleryStore {
	@observable selectedIndex = 0
	@observable lightRoomVisible = false
	@observable data = null

	constructor() {
		this.requestData()
	}

	@action toggleLightRoom() {
		this.lightRoomVisible = !this.lightRoomVisible
	}

	@action selectNext(offset) {
		let amountOfImages = this.amountOfImages
		let nextSelectedIndex = this.selectedIndex + offset
		nextSelectedIndex = (nextSelectedIndex < 0 ?
			amountOfImages - 1 : nextSelectedIndex) % amountOfImages
		this.selectedIndex = nextSelectedIndex
	}

	@action requestData() {
		new GalleryLoader().load((data) => {
			this.data = data
		})
	}

	isSelected(index) {
		return this.selectedIndex === index
	}

	@computed get dataLoading() {
		return this.data == null
	}

	@computed get images() {
		return this.data ? this.data.images : []
	}

	@computed get amountOfImages() {
		return this.images.length
	}

	@computed get selectedImageVO() {
		return this.images[this.selectedIndex]
	}

	@computed get selectedImageUrl() {
		const vo = this.selectedImageVO
		return vo.path + vo.name
	}
}

export default GalleryStore