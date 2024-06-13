const { request, response } = require("express");
const generateJWT = require("../helpers/generate-jwt");
const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require('bcryptjs');



const login = async (req = request, res = response) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Invalidate credentials'
            });
        }

        const token = await generateJWT(user.id);

        const userData = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            role_id: user.role_id,
            session_token: token

        };

        res.status(200).json({
            message: 'login',
            data: userData
        });

    } catch (error) {
        res.status(500).json({
            message: 'error',
            error: error
        });
    }
}

const register = async (req = request, res = response) => {
    try {
        console.log(req.body);
        const {
            name: nameReq,
            lastname: lastnameReq,
            email: emailReq,
            phone: phoneReq,
            password: passwordReq,
        } = req.body;

        const role = await Role.findOne({
            where: {
                name: 'CLIENTE'
            }
        });

        const userData = {
            name: nameReq,
            lastname: lastnameReq,
            email: emailReq,
            phone: phoneReq,
            password: passwordReq,
            role_id: role.id
        };
        
        const user = new User(userData);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(passwordReq, salt);
        await user.save();

        const token = await generateJWT(user.id);

        const { id, name, lastname, email, phone, role_id } = user;

        const dataUser = {
            id,
            name,
            lastname,
            email,
            phone,
            role_id,
            session_token: token
        };


        res.status(201).json({
            message: 'register',
            data: dataUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'error in server',
            error: error
        });
    }
}

module.exports = {
    login,
    register
}