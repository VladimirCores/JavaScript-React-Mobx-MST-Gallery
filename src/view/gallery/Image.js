import DomElement from '../base/DomElement'

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

export default Image
