import DomElement from '../base/DomElement'

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

export default Gallery