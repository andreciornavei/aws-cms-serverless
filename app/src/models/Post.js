const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    content: DataTypes.STRING,
    img_url: DataTypes.STRING,
    author: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    created_at: {
      type: DataTypes.DATE,
      get(){
        return moment(this.getDataValue('created_at')).format('DD/MM/YYYY');
      }
    }
  });

  return Post;
};
