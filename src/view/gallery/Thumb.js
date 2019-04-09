import DomElement from '../base/DomElement'

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

export default Thumb