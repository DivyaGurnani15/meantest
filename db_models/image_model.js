const mongoose = require('mongoose');

const imageUploadSchema = new mongoose.Schema({
    imageName: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const UploadImage = mongoose.model('UploadImage', imageUploadSchema);

module.exports = UploadImage;