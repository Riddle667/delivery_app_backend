const { Router } = require("express");
const { uploadImageCloudianary } = require("../controller/uploadController");
const { validateFields } = require("../middleware/validate-fields");
const { validateArchiveUpload } = require("../middleware/validate-archive");




const router = Router();


// actualiza la imagen.
router.put('/:collection/:id',[
    validateArchiveUpload,
    validateFields
],uploadImageCloudianary );



module.exports = router;