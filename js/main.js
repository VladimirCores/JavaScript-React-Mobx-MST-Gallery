function DomElement(parent, dom) {
    this.parent = parent
    this.dom = dom
    this.domElements = []

    this.addElement = function (element) { this.domElements.push(element) }

    this.deselect = function () { /* abstract */ this.domElements.forEach(function(de) { de.deselect() }) }
    this.select = function () { /* abstract */ this.domElements.forEach(function(de) { de.select() }) }
    this.update = function (data) { /* abstract */ this.domElements.forEach(function(de) { de.update(data) }) }

    this.show = function () {
        this.domElements.forEach(function(de) { de.show() })
        this.parent.appendChild(this.dom)
    }

    this.hide = function () {
        this.parent.removeChild(this.dom)
    }

    this.dispose = function () {
        if (this.dom.parentNode != null)
            this.hide()

        this.dom = null
        this.parent = null
    }
}

function Spinner(parent) {
    var dom = document.createElement('div')
    DomElement.call(this, parent, dom)
    dom.className = 'Spinner'
    var domSpin = document.createElement('div')
    domSpin.className = dom.className + '_spin'
    dom.appendChild(domSpin)
}

function GalleryLoader() {
    var API_GALLERY_URL = 'http://localhost:4321/gallery'
    var xmlHttp = new XMLHttpRequest()

    this.load = function (callback) {
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4
                && xmlHttp.status === 200)
            {
                var response = xmlHttp.responseText
                xmlHttp.onreadystatechange = null
                callback(JSON.parse(response))
            }
        }
        setTimeout(() => {
            xmlHttp.open('GET', API_GALLERY_URL, true) // true for asynchronous
            xmlHttp.send(null)
        }, 1000)
    }
}

function Thumb(parentDom, width, height, url) {
    var dom = document.createElement('div')
    DomElement.call(this, parentDom, dom);
    dom.className = 'Thumb'
    var style = dom.style
    style.width = width + 'px'
    style.height = height + 'px'
    style.backgroundImage = `url(${url})`

    this.deselect = function () { this.setHighlight(false) }
    this.select = function () {
        this.setHighlight(true)
        this.dom.scrollIntoView(false)
    }

    this.setHighlight = function (value) {
        var HIGHLIGHT_CLASS_NAME = ' highlight'
        this.dom.className = value ?
            this.dom.className + HIGHLIGHT_CLASS_NAME
            : this.dom.className.replace(HIGHLIGHT_CLASS_NAME, '')
    }
}

function LightRoom(parentDom) {
    var dom = document.createElement('div')
    DomElement.call(this, parentDom, dom);
    dom.className = 'LightRoom'
}

function Image(parentDom, width, height) {
    var dom = document.createElement('img')
    DomElement.call(this, parentDom, dom);
    dom.className = 'Image'
    var style = dom.style
    style.width = width + 'px'
    style.height = 'auto'

    this.update = function(url) { this.dom.src = url }
}

function Gallery(parentDom) {
    var dom = document.createElement('div')
    DomElement.call(this, parentDom, dom);
    dom.className = 'Gallery'
    this.selectedElement = null

    this.select = function(nextSelectedIndex) {
        var nextSelectedElement = this.domElements[nextSelectedIndex]
        if (this.selectedElement) this.selectedElement.deselect()
        this.selectedElement = nextSelectedElement
        nextSelectedElement.select()
    }
}

Spinner.prototype = new DomElement;
Thumb.prototype = new DomElement;
Image.prototype = new DomElement;
LightRoom.prototype = new DomElement;
Gallery.prototype = new DomElement;

var Keyaboard = {
  ENTER: 13,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39
};

function GalleryController(gallery) {
    /* VIEW */
    this.gallery = gallery
    this.lightroom = null
    /* MODEL */
    this.selectedIndex = 0
    this.images = []

    this.setup = function(jsonData) {
        var galleryDom = this.gallery
        this.images = jsonData.images
        this.images.forEach((imageVO) => {
            var thumbVO = imageVO.thumb
            var thumbDom = new Thumb(
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
            if (event.keyCode === Keyaboard.ARROW_LEFT) {
                this.selectNext(-1)

            }
            else if (event.keyCode === Keyaboard.ARROW_RIGHT) {
                this.selectNext(1)
            }
            else if (event.keyCode === Keyaboard.ENTER) {
                if (!this.lightroom) this.expandLightRoom(this.selectedIndex)
                else this.collapseLightRoom()
            }
        }
    }

    this.updateLightRoom = function(index) {
        var imageVO = this.images[index]
        var url = imageVO.path + imageVO.name
        this.lightroom.update(url)
    }

    this.collapseLightRoom = function() {
        this.lightroom.dispose()
        this.lightroom = null
    }

    this.expandLightRoom = function(index) {
        var imageVO = this.images[index]
        var url = imageVO.path + imageVO.name;
        this.lightroom = new LightRoom(this.gallery.parent)
        this.lightroom.addElement(new Image(
            this.lightroom.dom,
            imageVO.width,
            imageVO.height
        ))
        this.lightroom.update(url)
        this.lightroom.show()
    }

    this.select = function(index) {
        this.selectedIndex = index
        this.gallery.select(index)
    }

    this.selectNext = function(offset) {
        var amountOfImages = this.images.length
        var nextSelectedIndex = this.selectedIndex + offset
        nextSelectedIndex = (nextSelectedIndex < 0 ? amountOfImages - 1 : nextSelectedIndex) % amountOfImages
        this.select(nextSelectedIndex)
        if (this.lightroom)
            this.updateLightRoom(nextSelectedIndex)
    }
}

// MAIN PROCESS
(function () {
  var domRoot = document.getElementById('Root')
  var gallery = new Gallery(domRoot)
  var spinner = new Spinner(domRoot)

  var controller = new GalleryController(gallery)

  new GalleryLoader().load(function (jsonData) {
    controller.setup(jsonData)
    controller.select(0)
    gallery.show()
    spinner.hide()
  })

  spinner.show()
})()