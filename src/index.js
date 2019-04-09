import GalleryLoader from './model/loader/GalleryLoader'
import GalleryController from './controller/GalleryController'
import Gallery from './view/gallery/Gallery'
import Spinner from './view/misc/Spinner'

// MAIN PROCESS
(function () {
  const domRoot = document.getElementById("Root")
  const gallery = new Gallery(domRoot)
  const spinner = new Spinner(domRoot)

  const galleryController = new GalleryController(gallery)

  new GalleryLoader().load(function (jsonData) {
    galleryController.setup(jsonData)
    galleryController.select(0)
    gallery.show()
    spinner.hide()
  })

  spinner.show()
})()
