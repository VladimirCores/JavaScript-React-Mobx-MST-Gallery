class DomElement {
  constructor(parent, dom, className) {
    this.parent = parent
    this.dom = dom
    this.domElements = []
    this.dom.className = className ? className : this.constructor.name
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

export default DomElement