const { request, response } = require('express');
const Category = require('../models/category');

const createCategory = async (req = request, res = response) => {

    try {
        console.log(req.body);
        const { name, description } = req.body;

        const category = Category.create({
            name: name,
            description: description
        });

        res.status(200).json({
            message: 'create category',
            category: category
        });
    } catch (error) {
        res.status(500).json({
            message: 'error',
            error: error
        });
    }

    
}

module.exports = {
    createCategory
}


