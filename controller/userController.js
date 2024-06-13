const { request, response } = require("express");
const User = require("../models/user");


const getUsers = async (req = request, res = response) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            message: 'get users',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message: 'error',
            error: error
        });
    }
}

module.exports = {
    getUsers
}