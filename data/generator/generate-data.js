const AppRoot = require('app-root-path');
const FS = require('fs-extra');
const FakerImage = require('faker').image
const FakerRandom = require('faker').random
const ImageThumbnail = require('image-thumbnail');
const ImageDownload = require('image-downloader')

const OUTPUT_DIR_ROOT = AppRoot + '/../../'
const OUTPUT_DIR = 'img/gallery/'
const IMAGES_COUNT = 10
const IMAGE_THEME = 'nature'
const IMAGE_WIDTH = 640
const IMAGE_HEIGHT = 480
const IMAGE_EXT = '.jpeg'
const IMAGE_PREFIX = 'image_'
const IMAGE_THUMB_POSTFIX = '_thumb'
const IMAGE_THUMB_WIDTH = 200
const IMAGE_THUMB_HEIGHT = 200
const IMAGE_THUMB_OPTION = {
  width: IMAGE_THUMB_WIDTH,
  height: IMAGE_THUMB_HEIGHT,
  responseType: 'buffer'
}

var counter = IMAGES_COUNT

async function Generate() {
  const images = [];
  await FS.emptyDir(OUTPUT_DIR_ROOT + OUTPUT_DIR);
  while (counter--)
  {
    let url = FakerImage.imageUrl(IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_THEME)
    let imageName = `${IMAGE_PREFIX}${counter}` + IMAGE_EXT
    let imagePath = OUTPUT_DIR_ROOT + OUTPUT_DIR + imageName
    const { filename } = await ImageDownload.image({ url:url, dest: imagePath })

    try {

      const thumbnail = await ImageThumbnail(filename, IMAGE_THUMB_OPTION)
      let thumbName = `${IMAGE_PREFIX}${counter}${IMAGE_THUMB_POSTFIX}` + IMAGE_EXT
      let thumbPath = OUTPUT_DIR_ROOT + OUTPUT_DIR + thumbName
      await FS.outputFile(thumbPath, thumbnail)

      images.push({
        id: FakerRandom.uuid(),
        title: FakerRandom.words(),
        thumb: {
          width: IMAGE_THUMB_WIDTH,
          height: IMAGE_THUMB_HEIGHT,
          path: OUTPUT_DIR,
          name: thumbName
        },
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        path: OUTPUT_DIR,
        name: imageName
      })

    } catch (err) { console.error(err); }
  }
  const result = {
    gallery: {
      images: images
    }
  };
  return result;
}

Generate().then((result) => {
  FS.outputJsonSync(AppRoot + '/../db.json', result, { spaces:'\t' })
  console.log("========= GENERATED GALLERY DATA ===========\n", result);
  console.log("============================================");
  console.log("============ WAIT A MOMENT =================");
})