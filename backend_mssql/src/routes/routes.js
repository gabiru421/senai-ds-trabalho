import express from 'express'
import controller from '../controller/user.controller.js'

export default(app) => {
    
    const router = express.Router();
    router.get("/users", controller.getAllUser);
    router.get("/users/:id", controller.getUserById);
    router.post("/users", controller.postUser);
    router.put("/users/:id", controller.putUser);
    router.delete("/users/:id", controller.deleteUserById);

    app.use('/api', router);

    // http://localhost:8800/users
    // http://localhost:8800/api/users

        
}