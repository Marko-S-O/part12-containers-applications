const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:example@localhost:3456/the_database?authSource=admin';
//const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:example@mongo:27017/the_database?authSource=admin';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
//const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379'

module.exports = {
  MONGO_URL,
  REDIS_URL
}