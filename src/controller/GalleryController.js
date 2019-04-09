import Keyboard from '../consts/Keyboard'
import LightRoom from '../view/gallery/LightRoom'
import Image from '../view/gallery/Image'
import Thumb from '../view/gallery/Thumb'

class GalleryController {
  constructor(gallery) {
    /* VIEW */
    this.gallery = gallery
    this.lightroom = null
    /* MODEL */
    this.selectedIndex = 0
    this.images = []
  }

  setup(jsonData) {
    let galleryDom = this.gallery
    this.images = jsonData.images
    this.images.forEach((imageVO) => {
      let thumbVO = imageVO.thumb
      let thumbDom = new Thumb(
        galleryDom.dom,
        thumbVO.width,
        thumbVO.height,
        thumbVO.path + thumbVO.name
      )

      galleryDom.addElement(thumbDom)
    })

    document.onkeydown = (event) => {
      event.stopImmediatePropagation()
      event = event || window.event
      if (event.keyCode === Keyboard.ARROW_LEFT) {
        this.selectNext(-1)

      }
      else if (event.keyCode === Keyboard.ARROW_RIGHT) {
        this.selectNext(1)
      }
      else if (event.keyCode === Keyboard.ENTER) {
        if (!this.lightroom) this.showLightRoom(this.selectedIndex)
        else this.removeLightRoom()
      }
    }
  }

  updateLightRoom(index) {
    let imageVO = this.images[index]
    let url = imageVO.path + imageVO.name
    this.lightroom.update(url)
  }

  removeLightRoom() {
    this.lightroom.dispose()
    this.lightroom = null
  }

  showLightRoom(index) {
    let imageVO = this.images[index]
    this.lightroom = new LightRoom(this.gallery.parent)
    this.lightroom.addElement(new Image(
      this.lightroom.dom,
      imageVO.width,
      imageVO.height,
      imageVO.path + imageVO.name
    ))
    this.lightroom.show()
  }

  select(index) {
    this.selectedIndex = index
    this.gallery.select(index)
  }

  selectNext(offset) {
    let amountOfImages = this.images.length
    let nextSelectedIndex = this.selectedIndex + offset
    nextSelectedIndex = (nextSelectedIndex < 0 ? amountOfImages - 1 : nextSelectedIndex) % amountOfImages
    this.select(nextSelectedIndex)
    if (this.lightroom)
      this.updateLightRoom(nextSelectedIndex)
  }
}

export default GalleryController