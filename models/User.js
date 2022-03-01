const sequelize = require("../config/connection")
const { Model, Datatype} = require('sequelize')
const bcrypt = require('bcrypt')

class User extends Model{
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.checkPassword)
    }
}

User.init(
    {}
)