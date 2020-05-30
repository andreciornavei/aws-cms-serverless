module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        access_group_id: DataTypes.STRING,
    });
    return User;
};