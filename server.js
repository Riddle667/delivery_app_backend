const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const database = require('./database/connection');
const Role = require('./models/role');
const User = require('./models/user');
const Category = require('./models/category');
const Product = require('./models/product');
const Image = require('./models/image');
const fileUpload = require('express-fileupload');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        

        // paths
        this.paths = {
            auth: '/api/auth',
            user: '/api/user',
            upload: '/api/upload',
            category: '/api/category',
            product: '/api/product',
            order: '/api/order',

        }

        // connect to db
        this.dbConnection();

        // middlewares
        this.middlewares();

        // routes application
        this.routes();
        
    }


    async dbConnection() {
        try {
            await database.authenticate();
            await Role.sync({ force: false });
            await User.sync({ force: false });
            await Category.sync({ force: false });
            await Product.sync({ force: false });
            await Image.sync({ force: false });

        } catch (error) {
            console.log(error);
        }
    }

    middlewares(){

        //Morgan
        this.app.use(logger('dev'));

        // Read and parse body
        this.app.use(express.json());

        // CORS
        this.app.use(cors());

        // fileUpload - load files
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
        
    }

    routes(){
        this.app.use(this.paths.auth, require('./routes/authRoutes'));
        this.app.use(this.paths.user, require('./routes/userRoutes'));
        this.app.use(this.paths.category, require('./routes/categoryRoutes'));
        this.app.use(this.paths.order, require('./routes/orderRoutes'));
        this.app.use(this.paths.product, require('./routes/productRoutes'));
        this.app.use(this.paths.upload, require('./routes/uploadRoutes'));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('listening on *:' + this.port);
        });
    }

    
}

module.exports = Server;