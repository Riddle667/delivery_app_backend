const { Router } = require("express");
const { getUsers } = require("../controller/userController");
const { validateJWT } = require("../middleware/validate-jwt");




const router = Router();

router.get('/getUsers',[
    validateJWT
], getUsers);

module.exports = router;