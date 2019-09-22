import GalleryLoader from './loader/GalleryLoader'
import {observable, action, computed, autorun, when, reaction} from 'mobx'

class GalleryStore {
	@observable selectedIndex = 0
	@observable selectedImage = { image:null }
	@observable lightRoomVisible = false
	@observable data = null

	constructor() {
		this.requestData()
		autorun((reaction) => {
			console.log(`> autorun: selectedIndex has changed: ${this.selectedIndex}`)
			if (this.selectedIndex === 5)
			{
				reaction.dispose()
				throw new Error("Selected value is 5")
			}
		}, {
			onError(e) {
				console.error(`> autorun: Error, reaction disposed: ${e}`)
			}
		})

		when(
			() => this.lightRoomVisible && this.selectedIndex === 2,
			() => {
				console.log('> when: Lightroom show third item')
			}
		)

		reaction(
			() => this.selectedIndex,
			(selectedIndex, reaction) => {
				console.log(`> reaction: selectedIndex = ${selectedIndex}`)
			}
		)
	}

	@action toggleLightRoom() {
		this.lightRoomVisible = !this.lightRoomVisible
	}

	@action selectNext(offset) {
		let amountOfImages = this.images.length
		let nextSelectedIndex = this.selectedIndex + offset
		nextSelectedIndex = (nextSelectedIndex < 0 ?
			amountOfImages - 1 : nextSelectedIndex) % amountOfImages
		this.selectedImageVO.thumb.selected = false
		this.selectedIndex = nextSelectedIndex
		this.selectedImage.image = this.selectedImageVO
		this.selectedImageVO.thumb.selected = true
	}

	@action requestData() {
		new GalleryLoader().load((data) => {
			this.data = data
			this.selectedImage.image = this.selectedImageVO
			this.selectedImageVO.thumb.selected = true
		})
	}

	@computed get dataLoading() {
		return this.data == null
	}

	@computed get images() {
		return this.data ? this.data.images : []
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