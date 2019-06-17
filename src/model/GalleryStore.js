import GalleryLoader from './loader/GalleryLoader'
import {observable, action, computed, autorun, when, reaction} from 'mobx'
import {computedFn} from 'mobx-utils'

class GalleryStore {
	@observable selectedIndex = 0
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
				// new GalleryLoader().updateSettings("selectedIndex", selectedIndex)
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
		this.selectedIndex = nextSelectedIndex
	}

	@action requestData() {
		new GalleryLoader().load((data) => {
			this.data = data
		})
	}

	isSelected = computedFn(function (index) {
		return this.selectedIndex === index
	})

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