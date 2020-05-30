module.exports = {
  host: '127.0.0.1',
  username: 'root',
  password: 'docker',
  database: 'aws_cms_serverless',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
};