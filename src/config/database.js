module.exports = {
  dialect: 'postgres',
  host: process.env.HOSTNAME,
  username: process.env.USERNAME,
  password: process.env.PASSOWRD,
  database: process.env.DATABASE,
  define: {
    timespamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
