const { Router, request, response } = require("express");
const Category = require("../models/category");
const { createCategory } = require("../controller/categoryController");




const router = Router();

router.get('/show-category', (req = request, res = response) => {

    const categories = Category.findAll();

    res.json({
        message: 'show category',
        categories: categories,
    });
});

router.post('/create-category', createCategory);

module.exports = router;