import GalleryLoader from './loader/GalleryLoader'
import {observable, action, computed, autorun, when, reaction} from 'mobx'

class GalleryStore {
	@observable selected = { index: -1, image: null }
	@observable data = null

	constructor() {
		this.requestData()
		autorun((reaction) => {
			console.log(`> autorun: selectedIndex has changed: ${this.selected.index}`)
			if (this.selected.index === 5)
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
			() => this.selected.image && this.selected.index === 2,
			() => {
				console.log('> when: Lightroom show third item')
			}
		)

		reaction(
			() => this.selected.index,
			(selectedIndex, reaction) => {
				console.log(`> reaction: selectedIndex = ${selectedIndex}`)
			}
		)
	}

	@action toggleLightRoom() {
		if (this.selected.image == null)
			this.selected.image = this.currentImage;
		else this.selected.image = null;
	}

	@action selectNext(offset) {
		let amountOfImages = this.images.length
		let nextSelectedIndex = this.selected.index + offset
		nextSelectedIndex = (nextSelectedIndex < 0 ?
			amountOfImages - 1 : nextSelectedIndex) % amountOfImages

		this.currentImage.thumb.selected = false
		this.selected.index = nextSelectedIndex
		if (this.selected.image)
			this.selected.image = this.currentImage
		this.currentImage.thumb.selected = true
	}

	@action requestData() {
		new GalleryLoader().load((data) => {
			this.data = data
			this.selected.index = 0;
			this.currentImage.thumb.selected = true
		})
	}

	@computed get dataLoading() {
		return this.data == null
	}

	@computed get images() {
		return this.data ? this.data.images : []
	}

	@computed get currentImage() {
		return this.images[this.selected.index]
	}

	@computed get currentImageUrl() {
		const vo = this.currentImage
		return vo.path + vo.name
	}
}

export default GalleryStore