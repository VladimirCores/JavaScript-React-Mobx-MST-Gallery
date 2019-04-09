import DomElement from '../base/DomElement'

class Spinner extends DomElement {
  constructor(parent) {
    const dom = document.createElement("div")
    super(parent, dom)
    const domSpin = document.createElement("div")
    domSpin.className = dom.className + "_spin"
    dom.appendChild(domSpin)
  }
}

export default Spinner