const API_URL = 'http://localhost'
const API_PORT = '4321'
const API_PATH = '/gallery'

const getGalleryPath = () => API_URL + ':' + API_PORT + API_PATH

class GalleryLoader {

    static fetch() { return window.fetch(getGalleryPath()) }

    constructor() {
        this.xmlHttp = new XMLHttpRequest()
    }

    load(callback) {
        let theLoader = this.xmlHttp
        theLoader.onreadystatechange = function () {
            if (theLoader.readyState === 4
                && theLoader.status === 200) {
                const response = theLoader.responseText
                theLoader.onreadystatechange = null
                callback(JSON.parse(response))
            }
        }.bind(this)
        setTimeout(() => {
            theLoader.open('GET', getGalleryPath(), true) // true for asynchronous
            theLoader.send(null)
        }, 1000)
    }
}

export default GalleryLoader