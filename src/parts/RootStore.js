import {action, computed, observable} from 'mobx/lib/mobx'
import GalleryStore from './gallery/model/GalleryStore'
import GalleryLoader from '../services/loaders/GalleryLoader'

export default class RootStore {
	constructor() {
		this.galleryStore = new GalleryStore()
	}

	@computed get isReady() {
		return this.galleryStore.data != null
	}

	@action requestData() {
		new GalleryLoader().load((data) => {
			this.galleryStore.setup(data)
		})
	}
}