class DomElement {
  constructor(parent, dom) {
    this.parent = parent
    this.dom = dom
    this.domElements = []
    this.dom.className = this.constructor.name
  }

  addElement(element) { this.domElements.push(element) }

  deselect() { /* abstract */ this.domElements.forEach((domElement) => domElement.deselect())  }
  select() { /* abstract */ this.domElements.forEach((domElement) => domElement.select())  }
  update(data) { /* abstract */ this.domElements.forEach((domElement) => domElement.update(data)) }

  show() {
    this.domElements.forEach((domElement) => domElement.show())
    this.parent.appendChild(this.dom)
  }

  hide() {
    this.parent.removeChild(this.dom)
  }

  dispose() {
    if (this.dom.parentNode != null)
      this.hide()

    this.dom = null
    this.parent = null
  }
}

class Spinner extends DomElement {
  constructor(parent) {
    const dom = document.createElement("div")
    super(parent, dom)
    const domSpin = document.createElement("div")
    domSpin.className = dom.className + "_spin"
    dom.appendChild(domSpin)
  }
}

class GalleryLoader {
  static get API_GALLERY_URL() {
    return 'http://localhost:3000/gallery'
  }

  constructor() {
    this.xmlHttp = new XMLHttpRequest()
  }

  load(callback) {
    let theLoader = this.xmlHttp
    theLoader.onreadystatechange = function() {
      if (theLoader.readyState === 4
      && theLoader.status === 200)
      {
        const response = theLoader.responseText
        theLoader.onreadystatechange = null
        callback(JSON.parse(response))
      }
    }.bind(this)
    setTimeout(() => {
      theLoader.open("GET", GalleryLoader.API_GALLERY_URL, true) // true for asynchronous
      theLoader.send(null)
    }, 1000)
  }
}

class Thumb extends DomElement{
  constructor(parent, width, height, url) {
    const dom = document.createElement('div')
    super(parent, dom)
    let style = dom.style
    style.width = width + 'px'
    style.height = height + 'px'
    style.backgroundImage = `url(${url})`
  }

  deselect() { this.highlight = false }
  select() {
    this.highlight = true
    this.dom.scrollIntoView(false)
  }

  set highlight(value) {
    const HIGHLIGHT_CLASS_NAME = ' highlight'
    this.dom.className = value ?
        this.dom.className + HIGHLIGHT_CLASS_NAME
      : this.dom.className.replace(HIGHLIGHT_CLASS_NAME, '')
  }
}

class LightRoom extends DomElement {
  constructor(parentDom) {
    const dom = document.createElement("div")
    super(parentDom, dom)
  }
}

class Image extends DomElement {
  constructor(parentDom, width, height, url) {
    const dom = document.createElement("img")
    super(parentDom, dom)
    let style = dom.style
    style.width = width + "px"
    style.height = 'auto'
    this.update(url)
  }

  update(url) { this.dom.src = url }
}

class Gallery extends DomElement {
  constructor(parent) {
    const dom = document.createElement("div")
    super(parent, dom)
    this.selectedElement = null
  }

  select(nextSelectedIndex) {
    let nextSelectedElement = this.domElements[nextSelectedIndex]
    if (this.selectedElement) this.selectedElement.deselect()
    this.selectedElement = nextSelectedElement
    nextSelectedElement.select()
  }
}

class GalleryController {
  constructor(gallery) {
    this.gallery = gallery
    this.selectedIndex = 0
    this.lightroom = null
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
      if (event.keyCode == '37') {
        this.navigateToImageWithOffset(-1)

      }
      else if (event.keyCode == '39') {
        this.navigateToImageWithOffset(1)
      }
      else if (event.keyCode == '13') {
        if (!this.lightroom) this.expandLightRoom(this.selectedIndex)
        else this.collapseLightRoom()
      }
    }
  }

  updateLightRoom(index) {
    let imageVO = this.images[index]
    let url = imageVO.path + imageVO.name
    this.lightroom.update(url)
  }

  collapseLightRoom() {
    this.lightroom.dispose()
    this.lightroom = null
  }

  expandLightRoom(index) {
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

  navigateToImageWithOffset(offset) {
    let amountOfImages = this.images.length
    let nextSelectedIndex = this.selectedIndex + offset
    nextSelectedIndex = (nextSelectedIndex < 0 ? amountOfImages - 1 : nextSelectedIndex) % amountOfImages
    this.select(nextSelectedIndex)
    if (this.lightroom)
      this.updateLightRoom(nextSelectedIndex)
  }
}

// MAIN PROCESS
(function () {
  const domRoot = document.getElementById("Root")
  let gallery = new Gallery(domRoot)
  let spinner = new Spinner(domRoot)
  let loader = new GalleryLoader()

  let controller = new GalleryController(gallery)

  loader.load(function (jsonData) {
    controller.setup(jsonData)
    controller.select(0)
    gallery.show()
    spinner.hide()
  })

  spinner.show()
})()
