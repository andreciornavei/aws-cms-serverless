const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        access_group_id: DataTypes.STRING,
    },{
        hooks: {
            beforeSave: async user => {
                if(user.password){
                    user.password_hash = await bcrypt.hash(user.password, 8);
                }
            }
        }
    });

    User.prototype.checkPassword = function(password){
        return bcrypt.compare(password, this.password_hash)
    }

    User.prototype.generateToken = function(){
        return jwt.sign({ id: this.id, username: this.username, acl: this.access_group_id }, process.env.APP_SECRET)
    }

    return User;
};