const { request, response } = require("express");
const User = require("../models/user");
const cloudinary = require('cloudinary').v2;



const uploadImageCloudianary = async (req = request, res = response) => {
    try {
        const {collection , id } = req.params;
        let model;

        switch (collection) {
            case 'users':
                model = await User.findByPk(id);
                if (!model) {
                    return res.status(400).json({
                        success: false,
                        message: 'User not found'
                    });
                }  
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'The option is not valid'
                });
                break;
        }
        // Clear previous images
        if (model.image) {
            const nameArr = model.image.split('/');
            const name = nameArr[nameArr.length - 1];
            const [public_id] = name.split('.');
            cloudinary.uploader.destroy(`AppDelivery/${collection}/${public_id}`);
        }

        // Extract temporal image
        const { tempFilePath } = req.files.archive;
        console.log(tempFilePath);
        // upload to cloudinary
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
            folder: `AppDelivery/${collection}`
        });

        // Update image to user
        model.image = secure_url;
        await model.save();

        res.status(201).json({
            success: true,
            message: 'Image uploaded',
            data: model.image
        });

        console.log(response);

        res.send('Hello World');
    } catch (error) {
        
    }
}   




module.exports = {
  uploadImageCloudianary

}