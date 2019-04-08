class Component {
  constructor(parent, dom) {
    this.parent = parent
    this.dom = dom
    this.dom.className = this.constructor.name
  }

  show() {
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

class Spinner extends Component {
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

class Thumb extends Component{
  constructor(parent, width, height, url) {
    const dom = document.createElement('div')
    super(parent, dom)
    dom.style.width = width + 'px'
    dom.style.height = height + 'px'
    dom.style.backgroundImage = `url(${url})`
  }

  set highlight(value) {
    const HIGHLIGHT_CLASS_NAME = ' highlight'
    this.dom.className = value ?
        this.dom.className + HIGHLIGHT_CLASS_NAME
      : this.dom.className.replace(HIGHLIGHT_CLASS_NAME, '')
  }
}

class Lightroom extends Component {
  constructor(parentDom, url) {
    const dom = document.createElement("div")
    super(parentDom, dom)
    this.update(url)
  }

  update(url) {
    this.dom.style.backgroundImage = `url(${url})`
  }
}

class Image extends Component {
  constructor(parentDom, width, height, url) {
    const dom = document.createElement("div")
    dom.dataset["width"] = width;
    dom.dataset["height"] = height;
    dom.dataset["url"] = url;
    super(parentDom, dom)
    this.thumb = null
  }

  setThumb(value) { this.thumb = value }

  deselect() {
    this.dom.dataset["selected"] = false
    this.thumb.highlight = false
  }

  select() {
    this.dom.dataset["selected"] = true
    this.thumb.highlight = true
  }

  show() {
    this.thumb.show()
    super.show()
  }
}

class Gallery extends Component {
  constructor(parent) {
    const dom = document.createElement("div")
    super(parent, dom)
    this.domImages = []
    this.selectedImage = null
    this.lightroom = null;
  }

  addImage(image) { this.domImages.push(image) }

  select(nextSelectedIndex) {
    let nextSelectedImage = this.domImages[nextSelectedIndex]
    if (this.selectedImage) this.selectedImage.deselect()
    this.selectedImage = nextSelectedImage
    nextSelectedImage.select()
  }

  show() {
    this.domImages.forEach((image) => image.show())
    super.show()
  }

  expand(url) {
    this.lightroom = new Lightroom(this.dom, url)
    this.lightroom.show()
  }

  collapse() {
    this.lightroom.hide()
    this.lightroom = null
  }
}

class GalleryController {
  constructor(gallery) {
    this.gallery = gallery
    this.selectedIndex = 0
    this.expanded = false
    this.images = []
  }

  setup(jsonData) {
    let galleryDom = this.gallery
    this.images = jsonData.images
    this.images.forEach((imageVO) => {
      let imageDom = new Image(
        galleryDom.dom,
        imageVO.width,
        imageVO.height,
        imageVO.path + imageVO.name
      )
      let thumbVO = imageVO.thumb
      let thumbDom = new Thumb(
        imageDom.dom,
        thumbVO.width,
        thumbVO.height,
        thumbVO.path + thumbVO.name
      )

      imageDom.setThumb(thumbDom)
      galleryDom.addImage(imageDom)
    })

    document.onkeydown = (event) => {
      event.stopImmediatePropagation()
      event = event || window.event
      if (event.keyCode == '37') {
        this.navigateToImageWithOffset(-1)
        if (this.expanded) {
          this.collapse()
          this.expand(this.selectedIndex);
        }
      }
      else if (event.keyCode == '39') {
        this.navigateToImageWithOffset(1)
        if (this.expanded) {
          this.collapse()
          this.expand(this.selectedIndex);
        }
      }
      else if (event.keyCode == '13') {
        if (!this.expanded)
          this.expand(this.selectedIndex)
        else this.collapse()
      }
    }
  }

  collapse() {
    this.expanded = false
    this.gallery.collapse()
  }

  expand(index) {
    let imageVO = this.images[index];
    let url = imageVO.path + imageVO.name;
    this.expanded = true
    this.gallery.expand(url)
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
