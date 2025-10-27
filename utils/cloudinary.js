const cloudinary = require("../config/cloudinary")

exports.uploader = (file, folder = 'geomap') => {
  return new Promise(function (resolve, reject) {
    cloudinary.uploader.upload(
      file.tempFilePath,
      { 
        public_id: file.publicId,
        folder: folder,
        resource_type: 'auto'
      },
      function (error, result) {
        if (error) {
          return reject(error)
        }

        resolve(result)
      }
    )
  })
}