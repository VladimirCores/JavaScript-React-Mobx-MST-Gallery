import DomElement from '../base/DomElement'

class LightRoom extends DomElement {
  constructor(parentDom) {
    const dom = document.createElement("div")
    super(parentDom, dom, "LightRoom")
  }
}

export default LightRoom