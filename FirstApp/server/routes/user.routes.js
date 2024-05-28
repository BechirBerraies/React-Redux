const UserController=require('../controller/user.controller');


module.exports= app=>  {
    app.post('/api/user',UserController.createUser)
    app.post('/api/user/login', UserController.login)
    app.post('/api/user/register', UserController.register)
    app.post('/api/user/logout', UserController.logout)
    app.get('/api/user',UserController.findAllUsers)
    app.get('/api/user/:id',UserController.finOneUser)
    app.put('/api/user/:id', UserController.updateUser)
    app.delete('/api/user/:id',UserController.deleteUser)
}

