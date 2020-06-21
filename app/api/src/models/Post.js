module.exports = (sequelize, DataTypes) => {
  
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    content: DataTypes.STRING,
    img_url: DataTypes.STRING,
    author: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
  });

  return Post;
};
