module.exports = {
  dialect: 'postgres',
  url: process.env.POSTGRES_URL_DATABASE,
  define: {
    timespamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
