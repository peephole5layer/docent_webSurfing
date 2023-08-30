const kue = require('kue');
const redis = require('redis');

try {

  const client = redis.createClient({
    url: process.env.REDIS_URL
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  const queue = kue.createQueue({
    redis: {
      createClientFactory: () => client,
    },

  });

  kue.app.listen(3000);

  module.exports = queue;
} catch (err) {
  console.log('Error in Kue configuration:', err);
}
