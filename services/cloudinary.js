const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET
});


exports.uploads = (file) =>{
    return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) =>{
    resolve({url: result.url, id: result.public_id})
    }, {resource_type: "auto"})
    })
    }

module.exports = cloudinary;